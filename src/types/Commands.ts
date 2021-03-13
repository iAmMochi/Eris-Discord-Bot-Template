import { Message, Guild } from "eris";
import { Collection } from "../Utils/Constants/Collection";

export interface Command {
    name: string;
    aliases?: string[];
    only: "DM" | "GUILD";
    nsfw?: boolean;
    permissionLevels?:
    | PermissionLevels
    | ((
        message: Message,
        command: Command,
        guild?: Guild
    ) => boolean | Promise<boolean>);
    clientChannelPermissions?: string[];
    clientServerPermissions?: string[];
    userChannelPermissions?: string[];
    userServerPermissions?: string[];
    description: string;
    cooldown?: {
        seconds: number;
        allowedUses?: number;
    };
    arguments?: CommandArgument[];
    subcommands?: Collection<string, Command>;
    execute?: (message: Message, args: any, guild?: Guild) => unknown;
}

export interface CommandArgument {
    name: string;
    type?:
    | "number"
    | "string"
    | "...string"
    | "boolean"
    | "subcommand"
    | "member"
    | "role"
    | "categorychannel"
    | "newschannel"
    | "textchannel"
    | "voicechannel"
    | "command"
    | "duration"
    | "snowflake"
    | "...snowflake"
    | "guild";
    missing?: (message: Message) => unknown;
    required?: boolean;
    lowercase?: boolean;
    literals?: string[];
    defaultValue?: string | boolean | number | ((message: Message) => unknown);
}

export interface Argument {
    name: string;
    execute: (
        arg: CommandArgument,
        parameter: string[],
        message: Message,
        command: Command
    ) => unknown;
}

export interface Args {
    [key: string]: unknown;
}

export enum PermissionLevels {
    MEMBER,
    JR_MODERATOR,
    MODERATOR,
    ADMIN,
    SERVER_OWNER,
    BOT_SUPPORT,
    BOT_DEVS,
    BOT_OWNER
}