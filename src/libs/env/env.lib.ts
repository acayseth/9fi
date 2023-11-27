import {config} from "dotenv";
import {resolve} from "path";

const getOsEnv = (key: string, required: boolean = true, _default: any = undefined) => {
  if (required && typeof process.env[key] === 'undefined')
    throw new Error(`Environment variable ${key} is required`);
  else if (!required && typeof process.env[key] === 'undefined')
    process.env[key] = _default;
  return process.env[key];
};

config({path: resolve(process.cwd(), 'storage', '.env')});

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

export {
  env
};
