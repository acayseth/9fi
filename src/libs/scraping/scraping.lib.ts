import {load} from 'cheerio';
import axios from 'axios';

export interface IScrapingLink {
  code: number;
  url: string;
}

export class Scraping {

  private links: IScrapingLink[] = [];
  private tmpLinks: number[] = [];

  constructor(private url: string) {
  }

  public async handle() {
    const {status, data} = await axios.get(this.url)
    if (status !== 200) {
      return [];
    }

    const $ = load(data);

    $('a')
        .filter((index: number) => index > 24)
        .each((index, el) => {
          const url = $(el).attr('href');

          if (typeof url !== 'undefined' && url !== '/') {
            const code = parseInt(url.replace(/\/ro\//ig, ''), 10);
            if (!/booster/.test(url) && !/real-estate/.test(url)) {
              if (!this.tmpLinks.includes(code) && !isNaN(code)) {
                this.tmpLinks.push(code);
                this.links.push({code, url: `https://999.md${url}`})
              }
            }
          }

        });

    return this.links;
  }

}
