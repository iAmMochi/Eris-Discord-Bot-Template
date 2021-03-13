"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientCache = void 0;
const Collection_1 = require("./Utils/Constants/Collection");
exports.clientCache = {
    arguments: new Collection_1.Collection(),
    commands: new Collection_1.Collection(),
    guild: {
        prefixes: new Collection_1.Collection(),
        languages: new Collection_1.Collection()
    },
    inhibitors: new Collection_1.Collection(),
    permissionLevels: new Collection_1.Collection(),
    memberLastActive: new Collection_1.Collection()
};
//# sourceMappingURL=Cache.js.map