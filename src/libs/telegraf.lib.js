const
  env = require('./env.lib'),
  { Telegraf } = require('telegraf');

module.exports.send = async (link) => {
  const bot = new Telegraf(env.telegram.token);
  try {
    return await bot.telegram.sendMessage(env.telegram.chatId, link);
  } catch(e) {
    console.error(e, 'e');
  }
};