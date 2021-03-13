"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEmbed = void 0;
const Colors_1 = require("./Constants/Colors");
class MessageEmbed {
    constructor() {
        this.author = { icon_url: "", url: "", name: "" };
        this.url = "";
        this.title = "";
        this.thumbnail = { url: "" };
        this.color = Colors_1.Colors.DiscordBot;
        this.description = "";
        this.fields = [];
        this.image = { url: "" };
        this.timestamp = "";
        this.footer = { icon_url: "", text: "" };
    }
    withAuthor(options) {
        this.author = options;
        return this;
    }
    withURL(url) {
        this.url = url;
        return this;
    }
    withTitle(title) {
        this.title = title;
        return this;
    }
    withIcon(options) {
        this.thumbnail = options;
        return this;
    }
    withColor(color) {
        this.color = color;
        return this;
    }
    withDescription(description) {
        this.description = description;
        return this;
    }
    addField(options) {
        this.fields?.push(options);
        return this;
    }
    withImage(options) {
        this.image = options;
        return this;
    }
    addTimestamp(date) {
        this.timestamp = date;
        return this;
    }
    withFooter(options) {
        this.footer = options;
        return this;
    }
}
exports.MessageEmbed = MessageEmbed;
//# sourceMappingURL=Embed.js.map