var event = {
    version: '0',
    id: 'XXXXXXXX-XXXXX-XXXX-XXXXX-XXXXXXXX',
    'detail-type': 'Scheduled Event',
    source: 'aws.events',
    account: 'XXXXXXXXXX',
    time: '2019-01-30T06:27:04Z',
    region: 'ap-northeast-1',
    resources:
        [ 'arn:aws:events:ap-northeast-1:XXXXXXXXXX:rule/box-auditlog-exec' ],
    detail: {},
    fromHour : '10',
    teams_webhook : 'https://outlook.office.com/webhook/XXXXXXXXXXXXXXXXXXXX/IncomingWebhook/XXXXXXXXXXX/XXXXXXXXXXXXXX',
    keywords : 'AWS,GCP,Azure,CentOS,IDaaS,okta,onelogin,ゼロトラスト,zero trust,Nginx,Microsoft,Windows Server,脆弱性,ゼロデイ'
};

var context = {
    invokeid: 'invokeid',
    done: function(err,message){
        return;
    }
};

var lambda = require("./index.js");
lambda.handler(event,context);