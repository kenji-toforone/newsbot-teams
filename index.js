'use strict';

const rp = require('request-promise');
const lodash = require('lodash');
const GoogleNewsService = require('./google-news-service.js');

function dateTimeFilter(articles, fromDate) {
    return articles.filter((article) => {
      const pubDate = new Date(article.pubDate);
      return (pubDate.getTime() - fromDate.getTime()) > 1;  
    });
  }

function post2Slack(teams_webhook,message) {
  return rp.post(teams_webhook, {
    headers: { "Content-type": "application/json" },
    json: { text: message } ,
    uri : teams_webhook
  });
}

async function main(fromDate,teams_webhook,keywords) {
  try {
    const googleNews = await (new GoogleNewsService()).exec(keywords);
    const news = lodash.uniqBy(dateTimeFilter(lodash.concat([], googleNews), fromDate), 'link');
    const titleList = news.map((article) => {
      return `・[${ article.title }](${ article.link })<br>`;
    }).join('');
    const message = 'ニュースとってきた。<br>' + titleList;
    await post2Slack(teams_webhook,message);
  } catch(error) {
    console.error(error);
  }
}

exports.handler = (event, context, callback) => {
    const fromDate = new Date();
    const teams_webhook = event['teams_webhook'];
    const keywords = event['keywords'];
    fromDate.setHours(fromDate.getHours() - event['fromHour']);
    main(fromDate,teams_webhook,keywords);
};
