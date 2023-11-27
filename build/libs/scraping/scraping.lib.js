"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scraping = void 0;
const cheerio_1 = require("cheerio");
const axios_1 = __importDefault(require("axios"));
class Scraping {
    constructor(url) {
        this.url = url;
        this.links = [];
        this.tmpLinks = [];
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, data } = yield axios_1.default.get(this.url);
            if (status !== 200) {
                return [];
            }
            const $ = (0, cheerio_1.load)(data);
            $('a')
                .filter((index) => index > 24)
                .each((index, el) => {
                const url = $(el).attr('href');
                if (typeof url !== 'undefined' && url !== '/') {
                    const code = parseInt(url.replace(/\/ro\//ig, ''), 10);
                    if (!/booster/.test(url) && !/real-estate/.test(url)) {
                        if (!this.tmpLinks.includes(code) && !isNaN(code)) {
                            this.tmpLinks.push(code);
                            this.links.push({ code, url: `https://999.md${url}` });
                        }
                    }
                }
            });
            return this.links;
        });
    }
}
exports.Scraping = Scraping;
//# sourceMappingURL=scraping.lib.js.map