"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentLanguage = exports.sendMessage = exports.getTime = exports.createSubcommand = exports.createCommand = exports.stringToMilliseconds = exports.humanizeMilliseconds = void 0;
const Cache_1 = require("../Cache");
const Collection_1 = require("./Constants/Collection");
const Milliseconds_1 = require("./Constants/Milliseconds");
function humanizeMilliseconds(milliseconds) {
    const time = milliseconds / 1000;
    if (time < 1)
        return "1s";
    const weeks = Math.floor(time / 604800);
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
exports.humanizeMilliseconds = humanizeMilliseconds;
function stringToMilliseconds(text) {
    const matches = text.match(/(\d+[w|d|h|m|s]{1})/g);
    if (!matches)
        return;
    let total = 0;
    for (const match of matches) {
        const validMatch = /(w|d|h|m|s)/.exec(match);
        if (!validMatch)
            return;
        const number = match.substring(0, validMatch.index);
        const [letter] = validMatch;
        if (!number || !letter)
            return;
        let multiplier = Milliseconds_1.Milliseconds.SECOND;
        switch (letter.toLowerCase()) {
            case `w`:
                multiplier = Milliseconds_1.Milliseconds.WEEK;
                break;
            case `d`:
                multiplier = Milliseconds_1.Milliseconds.DAY;
                break;
            case `h`:
                multiplier = Milliseconds_1.Milliseconds.HOUR;
                break;
            case `m`:
                multiplier = Milliseconds_1.Milliseconds.MINUTE;
                break;
        }
        const amount = number ? parseInt(number, 10) : undefined;
        if (!amount)
            return;
        total += amount * multiplier;
    }
    return total;
}
exports.stringToMilliseconds = stringToMilliseconds;
function createCommand(command) {
    Cache_1.clientCache.commands.set(command.name, command);
}
exports.createCommand = createCommand;
function createSubcommand(commandName, subcommand, retries = 0) {
    const names = commandName.split("-");
    let command = Cache_1.clientCache.commands.get(commandName);
    if (names.length > 1) {
        for (const name of names) {
            const validCommand = command
                ? command.subcommands.get(name)
                : Cache_1.clientCache.commands.get(name);
            if (!validCommand)
                break;
            command = validCommand;
        }
    }
    if (!command) {
        if (retries === 20) {
            return console.error(`[ERROR] Subcommand ${subcommand} unable to be created for ${commandName}`);
        }
        setTimeout(() => createSubcommand(commandName, subcommand, retries++), 30000);
        return;
    }
    if (!command.subcommands) {
        command.subcommands = new Collection_1.Collection();
    }
    command.subcommands.set(subcommand.name, subcommand);
}
exports.createSubcommand = createSubcommand;
function getTime() {
    const now = new Date();
    const hours = now.getHours();
    const minute = now.getMinutes();
    let hour = hours;
    let amORpm = `AM`;
    if (hour > 12) {
        amORpm = `PM`;
        hour = hour - 12;
    }
    return `${hour >= 10 ? hour : `0${hour}`}:${minute >= 10 ? minute : `0${minute}`} ${amORpm}`;
}
exports.getTime = getTime;
function sendMessage(bot, channelID, content) {
    return bot.createMessage(channelID, content);
}
exports.sendMessage = sendMessage;
function getCurrentLanguage(guildID) {
    return Cache_1.clientCache.guild.languages.get(guildID) || "en-US";
}
exports.getCurrentLanguage = getCurrentLanguage;
//# sourceMappingURL=helpers.js.map