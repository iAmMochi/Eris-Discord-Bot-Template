"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Client_1 = tslib_1.__importDefault(require("./Models/Client"));
const ready_1 = tslib_1.__importDefault(require("./Listeners/ready"));
new Client_1.default()
    .emit("ready", () => ready_1.default(new Client_1.default()));
//# sourceMappingURL=Main.js.map