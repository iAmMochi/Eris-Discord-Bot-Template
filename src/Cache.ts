import { Message, Guild } from "eris";
import { Argument, Command, PermissionLevels } from "./types/Commands";
import { Collection } from "./Utils/Constants/Collection";

export const clientCache = {
    arguments: new Collection<string, Argument>(),
    commands: new Collection<string, Command>(),
    guild: {
        prefixes: new Collection<string, string>(),
        languages: new Collection<string, string>()
    },
    inhibitors: new Collection<
        string,
        (message: Message, command: Command, guild?: Guild) => Promise<boolean>
    >(),
    permissionLevels: new Collection<
        string,
        (message: Message, command: Command, guild?: Guild) => Promise<boolean>
    >(),
    memberLastActive: new Collection<string, number>()
};