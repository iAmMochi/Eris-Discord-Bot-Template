import { Client } from "eris";
import { readdirSync } from "fs";
import { join, resolve } from "path";
import { VultrexDB } from "vultrex.db";

import { Configs } from "../Configurations";
import { Command } from "../types/Commands";
import { Collection } from "../Utils/Constants/Collection";
import { MessageEmbed } from "../Utils/Embed";

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

        this.processListeners();

        this.startConnection();
    }

    public startConnection() {
        return super.connect();
    }

    public processListeners() {
        const events = readdirSync(resolve(join(__dirname, "..", "Commands"))).filter((f: string) => f.endsWith(".js"));

        for (let file of events) {
            const evnt = require(`../Listeners/${file}`);
            const eName: string = file.split('.')[0];

            this.on(eName, evnt.bind(null, this));
        }
    }
}

interface BotDatabases {
    Main: VultrexDB;
    Punishments: VultrexDB;
    Economy: VultrexDB;
}