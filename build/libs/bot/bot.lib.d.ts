import { Telegraf } from "telegraf";
export declare class Bot {
    private telegraf;
    private chatId;
    constructor(telegraf: Telegraf, chatId: string);
    sendMessage(message: string): Promise<import("@telegraf/types").Message.TextMessage>;
}
