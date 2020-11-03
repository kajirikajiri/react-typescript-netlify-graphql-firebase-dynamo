// import entire SDK
import aws from "aws-sdk";
import credentials from "../dynamo";
import movies from "./moviedata.js";

aws.config.update(credentials);

const dynamodb = new aws.DynamoDB.DocumentClient();

export function addSampleMovies() {
  movies.forEach((movie) => {
    const params = {
      TableName: "Movies",
      Item: {
        year: movie.year,
        title: movie.title,
        info: movie.info,
      },
    };
    dynamodb.put(params, (err, data) => {
      if (err) {
        console.log(movie.title, err);
      } else {
        console.log(movie.title);
      }
    });
  });
}
