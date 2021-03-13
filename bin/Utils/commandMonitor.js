"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCommand = exports.logCommand = exports.parseCommand = exports.parsePrefix = void 0;
const chalk_1 = require("chalk");
const Cache_1 = require("../Cache");
const Configurations_1 = require("../Configurations");
const parsePrefix = (guildID) => {
    const prefix = guildID ? Cache_1.clientCache.guild.prefixes.get(guildID) : Configurations_1.Configs.prefix;
    return prefix || Configurations_1.Configs.prefix;
};
exports.parsePrefix = parsePrefix;
const parseCommand = (commandName) => {
    const command = Cache_1.clientCache.commands.get(commandName);
    if (command)
        return command;
    return Cache_1.clientCache.commands.find((cmd) => Boolean(cmd.aliases?.includes(commandName)));
};
exports.parseCommand = parseCommand;
function logCommand(message, guildName, type, commandName) {
    const command = `[COMMAND: ${chalk_1.bgYellow(chalk_1.black(commandName))} - ${chalk_1.bgBlack(["Failure", "Slowmode", "Missing"].includes(type)
        ? chalk_1.red(type)
        : type === "Success"
            ? chalk_1.green(type)
            : chalk_1.white(type))}]`;
    const user = chalk_1.bgGreen(chalk_1.black(`${message.author.username}#${message.author.discriminator}(${message.author.id})`));
    const guild = chalk_1.bgMagenta(chalk_1.black(`${guildName}${message.guildID ? `(${message.guildID})` : ""}`));
    console.log(`${chalk_1.bgBlue(`[${getTime()}]`)} => ${command} by ${user} in ${guild}`);
}
exports.logCommand = logCommand;
async function parseArguments(message, command, parameters) {
    const args = {};
    if (!command.arguments)
        return args;
    let missingRequiredArg = false;
    const params = [...parameters];
    for (const argument of command.arguments) {
        const resolver = Cache_1.clientCache.arguments.get(argument.type || "string");
        if (!resolver)
            return;
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
        }
        else if (command.subcommands?.has(parameters[0])) {
            continue;
        }
        else if (argument.required !== false) {
            missingRequiredArg = true;
            argument.missing?.(message);
            break;
        }
    }
    return missingRequiredArg ? false : args;
}
async function commandAllowed(message, command, guild) {
    const inhibitorResults = await Promise.all(Cache_1.clientCache.inhibitors.map(async (inhibitor, name) => {
        const inhibited = await inhibitor(message, command, guild);
        return [name, inhibited];
    }));
    let allowed = true;
    for (const result of inhibitorResults) {
        const [name, inhibited] = result;
        if (inhibited) {
            allowed = false;
            logCommand(message, guild?.name || "DM", "Failure", command.name);
            console.log(`[INHIBITOR] ${name} on ${command.name} for ${message.author.username}#${message.author.discriminator}`);
        }
    }
    return allowed;
}
async function executeCommand(message, command, parameters, guild) {
    try {
        const args = (await parseArguments(message, command, parameters));
        if (!args) {
            return logCommand(message, guild?.name || "DM", "Missing", command.name);
        }
        const [argument] = command.arguments || [];
        let subcommand = argument ? args[argument.name] : undefined;
        if (!argument || argument.type !== "subcommand" || !subcommand) {
            if (!(await commandAllowed(message, command, guild)))
                return;
            await command.execute?.(message, args, guild);
            return logCommand(message, guild?.name || "DM", "Success", command.name);
        }
        if (!subcommand?.name) {
            subcommand = command?.subcommands?.get(subcommand);
        }
        if (![subcommand.name, ...(subcommand.aliases || [])].includes(parameters[0])) {
            executeCommand(message, command, parameters, guild);
        }
        else {
            const subParameters = parameters.slice(1);
            executeCommand(message, command, subParameters, guild);
        }
    }
    catch (error) {
        logCommand(message, guild?.name || "DM", "Failure", command.name);
        console.error(error);
    }
}
exports.executeCommand = executeCommand;
//# sourceMappingURL=commandMonitor.js.map