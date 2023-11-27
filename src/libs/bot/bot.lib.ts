import {Telegraf} from "telegraf";

export class Bot {

  public constructor(
      private telegraf: Telegraf,
      private chatId: string
  ) {

  }

  public sendMessage(message: string) {
    return this.telegraf.telegram.sendMessage(this.chatId, message);
  }

}
