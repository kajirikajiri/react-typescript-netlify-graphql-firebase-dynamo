// import entire SDK
import aws from "aws-sdk";
import credentials from "../dynamo";
import { MovieTypes } from "../../types/MovieTypes";

aws.config.update(credentials);

const dynamodb = new aws.DynamoDB.DocumentClient();

export const getMovies = async (year: number) => {
  const params = {
    TableName: "Movies",
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames: {
      "#yr": "year",
    },
    ExpressionAttributeValues: {
      ":yyyy": year,
    },
  };
  const promise = (): Promise<{
    Items: MovieTypes[];
    Count: number;
    ScannedCount: number;
  }> => {
    return new Promise((resolve, rejects) => {
      dynamodb.query(params, (err, data) => {
        if (err) {
          console.log("ERROR", err);
          rejects({});
        } else {
          console.log("SUCCESS", data);
          resolve(
            data as { Items: MovieTypes[]; Count: number; ScannedCount: number }
          );
        }
      });
    });
  };

  const result = await promise();
  return result;
};
