import { EmbedOptions, EmbedAuthorOptions, EmbedField, EmbedFooterOptions, EmbedImageOptions } from "eris";
export declare class MessageEmbed implements EmbedOptions {
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
    constructor();
    withAuthor(options: {
        name: string;
        icon_url?: string;
        url?: string;
    }): MessageEmbed;
    withURL(url: string): MessageEmbed;
    withTitle(title: string): MessageEmbed;
    withIcon(options: {
        url: string;
    }): MessageEmbed;
    withColor(color: number): MessageEmbed;
    withDescription(description: string): MessageEmbed;
    addField(options: {
        name: string;
        value: string;
        inline?: boolean;
    }): MessageEmbed;
    withImage(options: {
        url: string;
    }): MessageEmbed;
    addTimestamp(date?: string | Date): MessageEmbed;
    withFooter(options: {
        text: string;
        icon_url?: string;
    }): MessageEmbed;
}
