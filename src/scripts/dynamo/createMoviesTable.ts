// import entire SDK
import aws from "aws-sdk";
import credentials from "../dynamo";

aws.config.update(credentials);

const dynamodb = new aws.DynamoDB();

export function createMoviesTable() {
  const params = {
    TableName: "Movies",
    KeySchema: [
      { AttributeName: "year", KeyType: "HASH" },
      { AttributeName: "title", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "year", AttributeType: "N" },
      { AttributeName: "title", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  dynamodb.createTable(params, function (err, data) {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      console.log("SUCCESS: ", data);
    }
  });
}
