import { createCommand } from "../../Utils/helpers";

createCommand({
    name: "test",
    only: "GUILD",
    description: "Just a regular testing command.",
    execute: (message) => {
        try {
            message.channel.createMessage("Hello, I work :3");
        } catch (error) {
            console.log("[ERROR] An error has occurred!");
            console.error(error);
        }
    }
})