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
    fs.readFileSync('../components/data/accessibility.json', 'utf-8')
);

accessibilitiesData.forEach(
    function(accessibility) {
    
        var params = {
            TableName: "Accessibility",
            Item: {
                "name": accessibility.name
            }
        }

        dynamodbclient.put(
            params, function(err, data) {
                if (err) {
                    console.log("Unable to load accessiblity", accessibility.name, JSON.stringify(err, null, 2))
                } else {
                    console.log("Added", accessibility.name, "to table.")
                }
            }
        )


    }
)
