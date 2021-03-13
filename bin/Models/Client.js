"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eris_1 = require("eris");
const fs_1 = require("fs");
const path_1 = require("path");
const vultrex_db_1 = require("vultrex.db");
const Configurations_1 = require("../Configurations");
class default_1 extends eris_1.Client {
    constructor() {
        super(Configurations_1.Configs.token, {
            allowedMentions: {
                everyone: true
            },
            autoreconnect: true,
            maxReconnectAttempts: 5,
            maxResumeAttempts: 5,
            guildSubscriptions: true,
            maxShards: 1
        });
        this.database = {};
        this.database.Main = new vultrex_db_1.VultrexDB({ table: "economy", provider: "sqlite" });
        this.database.Economy = new vultrex_db_1.VultrexDB({ table: "economy", provider: "sqlite" });
        this.database.Punishments = new vultrex_db_1.VultrexDB({ table: "economy", provider: "sqlite" });
        this.processListeners();
        this.startConnection();
    }
    startConnection() {
        return super.connect();
    }
    processListeners() {
        const events = fs_1.readdirSync(path_1.resolve(path_1.join(__dirname, "..", "Commands"))).filter((f) => f.endsWith(".js"));
        for (let file of events) {
            const evnt = require(`../Listeners/${file}`);
            const eName = file.split('.')[0];
            this.on(eName, evnt.bind(null, this));
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=Client.js.map