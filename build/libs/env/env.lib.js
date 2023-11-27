"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const getOsEnv = (key, required = true, _default = undefined) => {
    if (required && typeof process.env[key] === 'undefined')
        throw new Error(`Environment variable ${key} is required`);
    else if (!required && typeof process.env[key] === 'undefined')
        process.env[key] = _default;
    return process.env[key];
};
(0, dotenv_1.config)({ path: (0, path_1.resolve)(process.cwd(), 'storage', '.env') });
const env = {
    parsing: {
        url: getOsEnv('SCRAPING_URL', true)
    },
    telegram: {
        token: getOsEnv('TELEGRAM_BOT_TOKEN', true),
        chatId: getOsEnv('TELEGRAM_BOT_CHAT_ID', true),
    },
    cron: {
        job: getOsEnv('CRON_JOB', false, '* * * * *')
    }
};
exports.env = env;
//# sourceMappingURL=env.lib.js.map