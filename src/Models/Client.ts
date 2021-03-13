import { Client } from "eris";
import { VultrexDB } from "vultrex.db";

import { Configs } from "../Configurations";
import { Command } from "../types/Commands";
import { Collection } from "../Utils/Constants/Collection";

export default class extends Client {
    database = {} as BotDatabases;

    public constructor() {
        super(Configs.token, {
            allowedMentions: {
                everyone: true
            },
            autoreconnect: true,
            maxReconnectAttempts: 5,
            maxResumeAttempts: 5,
            guildSubscriptions: true,
            maxShards: 1
        });

        this.database.Main = new VultrexDB({ table: "economy", provider: "sqlite" });
        this.database.Economy = new VultrexDB({ table: "economy", provider: "sqlite" });
        this.database.Punishments = new VultrexDB({ table: "economy", provider: "sqlite" });


    }

    public startConnection() {


        this.connect();
    }

    public processCommands(): Collection<string, Command> {

    }
}

interface BotDatabases {
    Main: VultrexDB;
    Punishments: VultrexDB;
    Economy: VultrexDB;
}