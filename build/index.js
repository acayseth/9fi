"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cron = __importStar(require("node-cron"));
const scraping_lib_1 = require("./libs/scraping/scraping.lib");
const env_lib_1 = require("./libs/env/env.lib");
const file_lib_1 = require("./libs/file/file.lib");
const bot_lib_1 = require("./libs/bot/bot.lib");
const telegraf_1 = require("telegraf");
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
class App {
    constructor(file, scraping, bot) {
        this.file = file;
        this.scraping = scraping;
        this.bot = bot;
    }
    handle(job) {
        return __awaiter(this, void 0, void 0, function* () {
            const links = yield this.scraping.handle();
            console.log('start =>', new Date(), links.length);
            for (let link of links) {
                if (!this.file.exists(link.code.toString(), 'founds')) {
                    yield delay(3000);
                    yield this.bot.sendMessage(link.url);
                    this.file.create(link.code.toString(), 'founds');
                    console.log('new =>', link);
                }
            }
            console.log('end');
        });
    }
}
const app = new App(new file_lib_1.File(), new scraping_lib_1.Scraping(env_lib_1.env.parsing.url), new bot_lib_1.Bot(new telegraf_1.Telegraf(env_lib_1.env.telegram.token), env_lib_1.env.telegram.chatId));
app.handle(env_lib_1.env.cron.job)
    .then(() => {
    console.log('done.');
})
    .catch(error => {
    console.error(error);
});
cron.schedule(env_lib_1.env.cron.job, () => __awaiter(void 0, void 0, void 0, function* () {
    app.handle(env_lib_1.env.cron.job)
        .then(() => {
        console.log('done.');
    })
        .catch(error => {
        console.error(error);
    });
}));
//# sourceMappingURL=index.js.map