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
    fs.readFileSync('../components/data/welcome_images.json', 'utf-8')
);

accessibilitiesData.forEach(
    function(image) {
        
        // DynamoDB does not want empty string value
        var className = image.className;
        if (className.trim() == "") {
            className = "no_class"
        }
    
        var params = {
            TableName: "WelcomeImages",
            Item: {
                "src": image.src,
                "alt": image.alt,
                "className": className
            }
        }

        dynamodbclient.put(
            params, function(err, data) {
                if (err) {
                    console.log("Unable to load accessiblity", image.src, JSON.stringify(err, null, 2))
                } else {
                    console.log("Added", image.src, "to table.")
                }
            }
        )


    }
)
