import Discord from "./Models/Client";
import ReadyEvent from "./Listeners/ready";

new Discord()
    .emit("ready", () => ReadyEvent(new Discord()));