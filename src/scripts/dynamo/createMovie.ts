// import entire SDK
import aws from 'aws-sdk';
import credentials from '../dynamo'
import {MovieTypes} from '../../types/MovieTypes'

aws.config.update(credentials)

const dynamodb = new aws.DynamoDB.DocumentClient()

export function createMovie(movie:MovieTypes) {
  const params = {
    TableName: "Movies",
    Item: {
      "year": movie.year,
      "title": movie.title,
      "info": movie.info
    }
  }
  dynamodb.put(params,(err, data) =>{
    if (err) {
      console.log('ERROR', movie.title, err)
    } else {
      console.log('SUCCESS', movie.title, data)
    }
  })
}
