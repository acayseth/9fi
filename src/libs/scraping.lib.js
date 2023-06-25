const
  cheerio = require('cheerio'),
  axios = require("axios");

module.exports.foundLinks = async (url) => {
  const { status, data } = await axios.get(url)
  if (status !== 200) {
    return [];
  }

  const
    $ = cheerio.load(data), links = [],
    selectors = 'a';

  $(selectors)
    .filter(i => i > 24)
    .each((i, v) => {
      if ($(v).attr('href')) {
        if (!/booster/.test($(v).attr('href')) && !/real-estate/.test($(v).attr('href'))) {
          links.push({ 
            code: $(v).attr('href').replace(/\/ru\//ig, ''),
            url: `https://999.md${$(v).attr('href')}`
          })
        }
      }
    });

  return links;
};