import { Message, Guild } from "eris";
import { Argument, Command } from "./types/Commands";
import { Collection } from "./Utils/Constants/Collection";
export declare const clientCache: {
    arguments: Collection<string, Argument>;
    commands: Collection<string, Command>;
    guild: {
        prefixes: Collection<string, string>;
        languages: Collection<string, string>;
    };
    inhibitors: Collection<string, (message: Message, command: Command, guild?: Guild | undefined) => Promise<boolean>>;
    permissionLevels: Collection<string, (message: Message, command: Command, guild?: Guild | undefined) => Promise<boolean>>;
    memberLastActive: Collection<string, number>;
};
