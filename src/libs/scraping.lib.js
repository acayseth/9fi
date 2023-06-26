const
  cheerio = require('cheerio'),
  axios = require("axios");

module.exports.foundLinks = async (url) => {
  const { status, data } = await axios.get(url)
  if (status !== 200) {
    return [];
  }

  const
    $ = cheerio.load(data),
    links = [],
    tmpLinks = [];
    selectors = 'a';

  $(selectors)
    .filter(i => i > 24)
    .each((i, v) => {
      const url = $(v).attr('href');
      if (url && url !== '/') {
        const code = parseInt(url.replace(/\/ro\//ig, ''), 10);
        if (!/booster/.test(url) && !/real-estate/.test(url) ) {
          if (!tmpLinks.includes(code)) {
            tmpLinks.push(code);
            links.push({ code, url: `https://999.md${url}` })
          }
        }
      }
    });

  return links;
};