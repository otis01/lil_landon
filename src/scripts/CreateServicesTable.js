var AWS = require('aws-sdk');

AWS.config.update(
    {
        region: 'us-east-1'
    }
);

var credentials = new AWS.SharedIniFileCredentials({profile: 'monkwire'});
AWS.config.credentials = credentials;

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: "Services",
    AttributeDefinitions: [
        {
            AttributeName: "name", 
            AttributeType: "S"
        }
    ],
    KeySchema: [
        {
            AttributeName: "name", 
            KeyType: "HASH"
        }
    ], 
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    },
    Tags: [
        {
            Key: 'Project',
            Value: 'LandonWebsite'
        }
    ]
};

dynamodb.createTable(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});
