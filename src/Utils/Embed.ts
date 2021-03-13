import { Embed } from "eris";

export class MessageEmbed implements Embed {
    author: {
        icon_url: string;
        name: string; url:
        string;
    };

    constructor() {
        this.author = {
            icon_url: "",
            name: "",
            url: ""
        };
    }
}