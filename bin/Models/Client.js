"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eris_1 = require("eris");
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
    }
    startConnection() {
        this.connect();
    }
    processCommands() {
    }
}
exports.default = default_1;
//# sourceMappingURL=Client.js.map