var AWS = require("aws-sdk");

AWS.config.update(
    {
        region:"us-east-1"
    }
);

var credentials = new AWS.SharedIniFileCredentials({profile: 'monkwire'});
AWS.config.credentials = credentials;

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: "MenuLinks",
    AttributeDefinitions: [
        {
            AttributeName: "class", 
            AttributeType: "S"
        },
        {
            AttributeName: "href", 
            AttributeType: "S"
        }, 
        {
            AttributeName: "text", 
            AttributeType: "S"
        }
    ],
    KeySchema: [
        {
            AttributeName: "href", 
            KeyType: "HASH"
        },
        {
            AttributeName: "text", 
            KeyType: "RANGE"
        }
    ], 
    LocalSecondaryIndexes: [
        {
            IndexName: 'ClassIndex',
            KeySchema: [
                {
                    AttributeName: 'href',
                    KeyType: "HASH"
                },
                {
                    AttributeName: 'class',
                    KeyType: "RANGE"
                },
            ],
            Projection: {
                ProjectionType: "KEYS_ONLY"
            }
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

// The dynamodb.createTable function will call the function(err, data) as a callback
// We know from the documentation that it will call this function with two params err and data
// We then define this callback function to show the error if it occurs or log success
dynamodb.createTable(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});

