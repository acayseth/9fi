"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
class Bot {
    constructor(telegraf, chatId) {
        this.telegraf = telegraf;
        this.chatId = chatId;
    }
    sendMessage(message) {
        return this.telegraf.telegram.sendMessage(this.chatId, message);
    }
}
exports.Bot = Bot;
//# sourceMappingURL=bot.lib.js.map