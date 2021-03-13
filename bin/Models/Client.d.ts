import { Client } from "eris";
import { VultrexDB } from "vultrex.db";
import { Command } from "../types/Commands";
import { Collection } from "../Utils/Constants/Collection";
export default class extends Client {
    database: BotDatabases;
    constructor();
    startConnection(): void;
    processCommands(): Collection<string, Command>;
}
interface BotDatabases {
    Main: VultrexDB;
    Punishments: VultrexDB;
    Economy: VultrexDB;
}
export {};
