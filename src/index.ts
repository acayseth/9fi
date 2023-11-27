import * as cron from 'node-cron';
import {Scraping} from "./libs/scraping/scraping.lib";
import {env} from "./libs/env/env.lib";
import {File} from "./libs/file/file.lib";
import {Bot} from "./libs/bot/bot.lib";
import {Telegraf} from "telegraf";

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class App {

  constructor(
      private file: File,
      private scraping: Scraping,
      private bot: Bot
  ) {
  }

  public async handle(job: string) {
    const links = await this.scraping.handle();
    console.log('start =>', new Date(), links.length);
    for (let link of links) {
      if (!this.file.exists(link.code.toString(), 'founds')) {
        await delay(3000);
        await this.bot.sendMessage(link.url)
        this.file.create(link.code.toString(), 'founds');
        console.log('new =>', link);
      }
    }
    console.log('end');
  }

}

const app = new App(
    new File(),
    new Scraping(env.parsing.url as string),
    new Bot(
        new Telegraf(env.telegram.token as string),
        env.telegram.chatId as string
    ),
);

app.handle(env.cron.job as string)
    .then(() => {
      console.log('done.')
    })
    .catch(error => {
      console.error(error)
    })

cron.schedule(env.cron.job as string, async () => {
  app.handle(env.cron.job as string)
      .then(() => {
        console.log('done.')
      })
      .catch(error => {
        console.error(error)
      })
});
