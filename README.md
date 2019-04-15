# newsbot-teams
This AWS Lambda function is Getting News from Google News and post to Microsoft Teams.

# Dependency
Node.js v8.10 higher is required

# Usage
## Local Setup
```$xslt
npm install
```
## Set Environment
```$xslt
vim main.js
```
* Change the value to your environment
````$xslt
fromHour : '10',
teams_webhook : 'https://outlook.office.com/webhook/XXXXXXXXXXXXXXXXXXXX/IncomingWebhook/XXXXXXXXXXX/XXXXXXXXXXXXXX',
keywords : 'AWS,GCP,Azure,CentOS,IDaaS,okta,onelogin,ゼロトラスト,zero trust,Nginx,Microsoft,Windows Server,脆弱性,ゼロデイ'
````
* fromHour : How many hours get past news.
* teams_webhook : Team's webhooks url.
* keywords : News keyword to get.

## Local Exec
```$xslt
node main.js
```

## Deploy from local to AWSLambda (usin S3)
```$xslt
zip -r newsbot-teams.zip index.js node_modules
aws s3 cp ./newsbot-teams.zip s3://[mybucket]/newsbot-teams.zip --profile [myprofile]
aws lambda update-function-code --function-name newsbot-teams --s3-bucket [mybucket] --s3-key newsbot-teams.zip --publish --profile [myprofile]
```
## Set Trigger
Use Cloudwatch event as a trigger.
* Constants (JSON text) when launching Lambda.
````$xslt
{"fromHour": "15", "teams_webhook": "https://outlook.office.com/webhook/xxxxxxx/IncomingWebhook/xxxxxxxxxxx/xxxxxxxx", "keywords": "AWS,GCP,Azure,CentOS,IDaaS,okta,onelogin,ゼロトラスト,zero trust,Nginx,Microsoft,Windows Server,脆弱性,ゼロデイ"}
````

# Licence
This software is released under the MIT License, see LICENSE.

# Authors
* [facebook](https://www.facebook.com/kenji.nishii.7)
* [twitter](https://twitter.com/kenji_toforone)

# References
* [Original copyright holder](https://twitter.com/belltree_gon)
