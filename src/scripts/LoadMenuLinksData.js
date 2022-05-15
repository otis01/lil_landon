var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.update(
    {
        region:"us-east-1"
    }
);

var credentials = new AWS.SharedIniFileCredentials({profile: 'monkwire'});
AWS.config.credentials = credentials;

var dynamodbclient = new AWS.DynamoDB.DocumentClient();
var accessibilitiesData = JSON.parse(
    fs.readFileSync('../components/data/menu_links.json', 'utf-8')
);

accessibilitiesData.forEach(
    function(menulink) {
    
        var params = {
            TableName: "MenuLinks",
            Item: {
                "class": menulink.class,
                "href": menulink.href,
                "text": menulink.text
            }
        }

        dynamodbclient.put(
            params, function(err, data) {
                if (err) {
                    console.log("Unable to load accessiblity", menulink.text, JSON.stringify(err, null, 2))
                } else {
                    console.log("Added", menulink.text, "to table.")
                }
            }
        )


    }
)
