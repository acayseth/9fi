const
  dotenv = require('dotenv'),
  path = require('path');

const getOsEnv = (key = null, required = true, _default = undefined) => {
  if (required && typeof process.env[key] === 'undefined')
    throw new Error(`Environment variable ${key} is required`);
  else if (!required && typeof process.env[key] === 'undefined')
    process.env[key] = _default;
  return process.env[key];
};

dotenv.config({path: path.join(process.cwd(), 'storage', '.env')});

const env = {
  parsing: {
    url: getOsEnv('SCRAPING_URL', true)
  },
  telegram: {
    token: getOsEnv('TELEGRAM_BOT_TOKEN', true),
    chatId: getOsEnv('TOLEGRAM_BOT_CHAT_ID', true),
  },
  cron: {
    job: getOsEnv('CRON_JOB', false, '* * * * *')
  }
};

module.exports = env;