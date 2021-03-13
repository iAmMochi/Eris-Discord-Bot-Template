import { Message, Guild } from "eris";
import { Command } from "../types/Commands";
export declare const parsePrefix: (guildID: string) => string;
export declare const parseCommand: (commandName: string) => Command | undefined;
export declare function logCommand(message: Message, guildName: string, type: "Failure" | "Success" | "Trigger" | "Slowmode" | "Missing", commandName: string): void;
export declare function executeCommand(message: Message, command: Command, parameters: string[], guild?: Guild): Promise<void>;
