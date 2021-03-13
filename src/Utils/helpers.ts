import { clientCache } from "../Cache";
import Client from "../Models/Client";
import { Command } from "../types/Commands";
import { Collection } from "./Constants/Collection";
import { Milliseconds } from "./Constants/Milliseconds";
import { MessageEmbed } from "./Embed";

export function humanizeMilliseconds(milliseconds: number): string {
    const time = milliseconds / 1000;
    if (time < 1) return "1s";

    const weeks = Math.floor(time / 604800)
    const days = Math.floor((time % 604800) / 7);
    const hours = Math.floor(((time % 604800) % 7) / 3600);
    const minutes = Math.floor((((time % 604800) % 7) % 3600) / 60);
    const seconds = Math.floor(((((time % 604800) % 7) % 3600) % 60) % 60);

    const weekString = weeks ? `${weeks}w ` : "";
    const dayString = days ? `${days}d ` : "";
    const hourString = hours ? `${hours}h ` : "";
    const minuteString = minutes ? `${minutes}m ` : "";
    const secondString = seconds ? `${seconds}s` : "";

    return `${weekString}${dayString}${hourString}${minuteString}${secondString}`;
}

export function stringToMilliseconds(text: string) {
    const matches = text.match(/(\d+[w|d|h|m|s]{1})/g);
    if (!matches) return;

    let total = 0;

    for (const match of matches) {
        const validMatch = /(w|d|h|m|s)/.exec(match);
        if (!validMatch) return;

        const number = match.substring(0, validMatch.index);
        const [letter] = validMatch;
        if (!number || !letter) return;

        let multiplier = Milliseconds.SECOND;
        switch (letter.toLowerCase()) {
            case `w`:
                multiplier = Milliseconds.WEEK;
                break;

            case `d`:
                multiplier = Milliseconds.DAY;
                break;

            case `h`:
                multiplier = Milliseconds.HOUR;
                break;

            case `m`:
                multiplier = Milliseconds.MINUTE;
                break;
        }

        const amount = number ? parseInt(number, 10) : undefined;
        if (!amount) return;

        total += amount * multiplier;
    }

    return total;
}

export function createCommand(command: Command) {
    clientCache.commands.set(command.name, command);
}

export function createSubcommand(
    commandName: string,
    subcommand: Command,
    retries = 0
) {
    const names = commandName.split("-");

    let command = clientCache.commands.get(commandName);

    if (names.length > 1) {
        for (const name of names) {
            const validCommand = command
                ? command.subcommands!.get(name)
                : clientCache.commands.get(name);
            if (!validCommand) break;

            command = validCommand;
        }
    }

    if (!command) {
        if (retries === 20) {
            return console.error(
                `[ERROR] Subcommand ${subcommand} unable to be created for ${commandName}`
            );
        }

        setTimeout(
            () => createSubcommand(commandName, subcommand, retries++),
            30000
        );

        return;
    }

    if (!command.subcommands) {
        command.subcommands = new Collection();
    }

    command.subcommands.set(subcommand.name, subcommand);
}



export function getTime() {
    const now = new Date();
    const hours = now.getHours();
    const minute = now.getMinutes();

    let hour = hours;
    let amORpm = `AM`;
    if (hour > 12) {
        amORpm = `PM`;
        hour = hour - 12;
    }

    return `${hour >= 10 ? hour : `0${hour}`}:${minute >= 10 ? minute : `0${minute}`
        } ${amORpm}`;
}

export function sendMessage(bot: Client, channelID: string, content: string) {
    return bot.createMessage(channelID, content);
}

export function getCurrentLanguage(guildID: string) {
    return clientCache.guild.languages.get(guildID) || "en-US";
}

// export async function createEmbedsPagination(
//     bot: Client,
//     channelID: string,
//     authorID: string,
//     embeds: MessageEmbed[],
//     defaultPage = 1,
//     reactionTimeout = Milliseconds.SECOND * 30,
//     reactions: {
//         [emoji: string]: (
//             setPage: (newPage: number) => void,
//             currentPage: number,
//             pageCount: number,
//             deletePagination: () => void
//         ) => Promise<void>;
//     } = {
//             "◀️": async (setPage, currentPage) => setPage(Math.max(currentPage - 1, 1)),
//             "↗️": async (setPage) => {
//                 const question = await sendMessage(bot, channelID, "To what page would you like to jump? Say `cancel` or `0` to cancel this prompt.");
//                 const answer = 
//             }
//         }
// ) {

// }