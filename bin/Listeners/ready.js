"use strict";
const helpers_1 = require("../Utils/helpers");
module.exports = async (client) => {
    [
        `[LOGIN] (${helpers_1.getTime()}): ${client.user.username}#${client.user.discriminator} successfully connected to Discord.`,
        `[STATISTICS] ${client.guilds.size} guilds...`,
        `[STATISTICS] ${client.users.size} users...`
    ].forEach((c) => {
        console.log(c);
    });
    client.database.Main.connect().then(async () => {
        await client.database.Economy.connect().then(async () => {
            await client.database.Punishments.connect();
            console.log(`[LOGIN] Databases connection established`);
        });
    });
    client.editStatus("dnd", {
        name: "your chat (*/ω＼*)",
        type: 3
    });
};
//# sourceMappingURL=ready.js.map