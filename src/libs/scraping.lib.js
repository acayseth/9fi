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
    selectors = 'ul.ads-list-photo li.ads-list-photo-item div.ads-list-photo-item-title a';

  $(selectors)
    .filter(i => i > 3)
    .each((i, v) => links.push({ code: $(v).attr('href').replace(/\/ru\//ig, ''), url: `https://999.md${$(v).attr('href')}` }));

  return [
    {code: '1000001', url: 'urlstring_01'},
    {code: '1000002', url: 'urlstring_02'}
  ];
};