import {
    bgBlack,
    bgBlue,
    bgGreen,
    bgMagenta,
    bgYellow,
    black,
    red,
    green,
    white
} from "chalk";
import { Message, Guild } from "eris";

import { Command } from "../types/Commands";
import { clientCache } from "../Cache";
import { Configs } from "../Configurations";

export const parsePrefix = (guildID: string) => {
    const prefix = guildID ? clientCache.guild.prefixes.get(guildID) : Configs.prefix;
    return prefix || Configs.prefix;
};

export const parseCommand = (commandName: string) => {
    const command = clientCache.commands.get(commandName);
    if (command) return command;

    return clientCache.commands.find((cmd) =>
        Boolean(cmd.aliases?.includes(commandName))
    );
};

export function logCommand(
    message: Message,
    guildName: string,
    type: "Failure" | "Success" | "Trigger" | "Slowmode" | "Missing",
    commandName: string
) {
    const command = `[COMMAND: ${bgYellow(black(commandName))} - ${bgBlack(
        ["Failure", "Slowmode", "Missing"].includes(type)
            ? red(type)
            : type === "Success"
                ? green(type)
                : white(type)
    )
        }]`;

    const user = bgGreen(
        black(
            `${message.author.username}#${message.author.discriminator}(${message.author.id})`
        )
    );

    const guild = bgMagenta(
        black(`${guildName}${message.guildID ? `(${message.guildID})` : ""}`)
    );

    console.log(
        `${bgBlue(`[${getTime()}]`)} => ${command} by ${user} in ${guild}`
    );
}

async function parseArguments(
    message: Message,
    command: Command,
    parameters: string[]
) {
    const args: { [key: string]: unknown } = {};
    if (!command.arguments) return args;

    let missingRequiredArg = false;

    const params = [...parameters];

    for (const argument of command.arguments) {
        const resolver = clientCache.arguments.get(argument.type || "string");
        if (!resolver) return;

        const result = await resolver.execute(argument, params, message, command);
        if (result !== undefined) {
            args[argument.name] = result;

            if (argument.type && ["...string", "...roles"].includes(argument.type)) {
                break;
            }

            params.shift();
            continue;
        }

        if (Object.prototype.hasOwnProperty.call(argument, "defaultValue")) {
            args[argument.name] = argument.defaultValue;
        } else if (command.subcommands?.has(parameters[0])) {
            continue;
        } else if (argument.required !== false) {
            missingRequiredArg = true;
            argument.missing?.(message);
            break;
        }
    }

    return missingRequiredArg ? false : args;
}

async function commandAllowed(
    message: Message,
    command: Command,
    guild?: Guild
) {
    const inhibitorResults = await Promise.all(
        clientCache.inhibitors.map(async (inhibitor, name) => {
            const inhibited = await inhibitor(message, command, guild);
            return [name, inhibited];
        })
    );

    let allowed = true;

    for (const result of inhibitorResults) {
        const [name, inhibited] = result;

        if (inhibited) {
            allowed = false;
            logCommand(message, guild?.name || "DM", "Failure", command.name);
            console.log(
                `[INHIBITOR] ${name} on ${command.name} for ${message.author.username}#${message.author.discriminator}`
            );
        }
    }

    return allowed;
}

export async function executeCommand(
    message: Message,
    command: Command,
    parameters: string[],
    guild?: Guild
) {
    try {
        const args = (await parseArguments(message, command, parameters)) as
            | {
                [key: string]: unknown;
            }
            | false;

        if (!args) {
            return logCommand(message, guild?.name || "DM", "Missing", command.name);
        }

        const [argument] = command.arguments || [];
        let subcommand = argument ? (args[argument.name] as Command) : undefined;

        if (!argument || argument.type !== "subcommand" || !subcommand) {
            if (!(await commandAllowed(message, command, guild))) return;

            await command.execute?.(message, args, guild);
            return logCommand(message, guild?.name || "DM", "Success", command.name);
        }

        if (!subcommand?.name) {
            subcommand = command?.subcommands?.get(
                (subcommand as unknown) as string
            ) as unknown as Command;
        }

        if (
            ![subcommand.name, ...(subcommand.aliases || [])].includes(parameters[0])
        ) {
            executeCommand(message, command, parameters, guild);
        } else {
            const subParameters = parameters.slice(1);
            executeCommand(message, command, subParameters, guild);
        }
    } catch (error) {
        logCommand(message, guild?.name || "DM", "Failure", command.name);
        console.error(error);
    }
}