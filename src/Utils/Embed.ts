import { EmbedOptions, EmbedAuthorOptions, EmbedField, EmbedFooterOptions, EmbedImageOptions } from "eris";

import { Colors } from "./Constants/Colors";

export class MessageEmbed implements EmbedOptions {
    author?: EmbedAuthorOptions;
    color?: number;
    description?: string;
    fields?: EmbedField[];
    footer?: EmbedFooterOptions;
    image?: EmbedImageOptions;
    thumbnail?: EmbedImageOptions;
    timestamp?: Date | string;
    title?: string;
    url?: string;

    constructor() {
        this.author = { icon_url: "", url: "", name: "" };
        this.url = "";
        this.title = "";
        this.thumbnail = { url: "" };
        this.color = Colors.DiscordBot;
        this.description = "";
        this.fields = [] as EmbedField[];
        this.image = { url: "" };
        this.timestamp = "";
        this.footer = { icon_url: "", text: "" };
    }

    public withAuthor(options: { name: string, icon_url?: string, url?: string }): MessageEmbed {
        this.author = options;

        return this;
    }

    /* ⚠ ONLY USE THIS IF YOU HAVE SET A TITLE ⚠ */
    public withURL(url: string): MessageEmbed {
        this.url = url;

        return this;
    }

    public withTitle(title: string): MessageEmbed {
        this.title = title;

        return this;
    }

    public withIcon(options: { url: string }): MessageEmbed {
        this.thumbnail = options;

        return this;
    }

    public withColor(color: number): MessageEmbed {
        this.color = color;

        return this;
    }

    public withDescription(description: string): MessageEmbed {
        this.description = description;

        return this;
    }

    public addField(options: { name: string, value: string, inline?: boolean }): MessageEmbed {
        this.fields?.push(options);

        return this;
    }

    public withImage(options: { url: string }): MessageEmbed {
        this.image = options;

        return this;
    }

    public addTimestamp(date?: string | Date): MessageEmbed {
        this.timestamp = date;

        return this;
    }

    public withFooter(options: { text: string, icon_url?: string }): MessageEmbed {
        this.footer = options;

        return this;
    }
}