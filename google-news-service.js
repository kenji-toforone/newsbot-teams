const Parser = require('rss-parser');
module.exports = class GoogleNewsService {
  constructor(){
  }
  createGoogleNewsUrl(keyword) {
    return 'https://news.google.com/_/rss/search?q='
      + encodeURIComponent(keyword)
      + '&hl=ja&gl=JP&ceid=JP:ja';
  }
  async exec(keywords) {
    const splitkeywords = keywords.split(',');
    const parser = new Parser();
    const feeds = await Promise.all(splitkeywords.map((keyword) => {
      return parser.parseURL(this.createGoogleNewsUrl(keyword));
    }));
    const articles = [];
    feeds.forEach((feed) => {
      feed.items.forEach((item) => {
        articles.push(item);
      });
    });
    return articles;
  }
}