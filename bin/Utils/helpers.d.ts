import Client from "../Models/Client";
import { Command } from "../types/Commands";
export declare function humanizeMilliseconds(milliseconds: number): string;
export declare function stringToMilliseconds(text: string): number | undefined;
export declare function createCommand(command: Command): void;
export declare function createSubcommand(commandName: string, subcommand: Command, retries?: number): void;
export declare function getTime(): string;
export declare function sendMessage(bot: Client, channelID: string, content: string): Promise<import("eris").Message<import("eris").TextableChannel>>;
export declare function getCurrentLanguage(guildID: string): string;
