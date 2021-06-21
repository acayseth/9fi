const
  env = require('./libs/env.lib'),
  fileLib = require('./libs/file.lib'),
  scrapingLib = require('./libs/scraping.lib'),
  telegrafLib = require('./libs/telegraf.lib'),
  cron = require('node-cron');

console.log('[start]', `-`.repeat(25));
console.log(`   Cron:`, env.cron.job);
console.log(`Craping:`, env.parsing.url);

cron.schedule(env.cron.job, async () => {
  
  const parallel = (link) => {
    fileLib.create(link.code);
    telegrafLib.send(link.url);
  };
  
  const links = await scrapingLib.foundLinks(env.parsing.url);
  links.filter(v => !fileLib.exists(v.code)).map((v, i) => setTimeout(() => parallel(v), i * 1000));
  
  console.log(new Date(), links.length);
});