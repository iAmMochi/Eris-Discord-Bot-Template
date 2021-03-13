import { Client } from "eris";
import { VultrexDB } from "vultrex.db";
export default class extends Client {
    database: BotDatabases;
    constructor();
    startConnection(): Promise<void>;
    processListeners(): void;
}
interface BotDatabases {
    Main: VultrexDB;
    Punishments: VultrexDB;
    Economy: VultrexDB;
}
export {};
