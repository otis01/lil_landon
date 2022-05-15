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
    TableName: "WelcomeImages",
    AttributeDefinitions: [
        {
            AttributeName: "src", 
            AttributeType: "S"
        },
        {
            AttributeName: "alt", 
            AttributeType: "S"
        }, 
        {
            AttributeName: "className", 
            AttributeType: "S"
        }
    ],
    KeySchema: [
        {
            AttributeName: "src", 
            KeyType: "HASH"
        },
        {
            AttributeName: "className", 
            KeyType: "RANGE"
        }
    ], 
    LocalSecondaryIndexes: [
        {
            IndexName: 'AltIndex',
            KeySchema: [
                {
                    AttributeName: 'src',
                    KeyType: "HASH"
                },
                {
                    AttributeName: 'alt',
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

