// import entire SDK
import aws from 'aws-sdk';
import credentials from '../dynamo'
import {MovieTypes} from '../../types/MovieTypes'

aws.config.update(credentials)

const dynamodb = new aws.DynamoDB.DocumentClient()

export async function getMovies(year: number) {
  const params = {
    TableName: "Movies",
    ProjectionExpression:"#yr, title, info.genres, info.actors[0]",
    KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy":1992,
        ":letter1": "A",
        ":letter2": "L"
    },
    // Limit: 10
  }
  const promise = ():Promise<{Items: MovieTypes[], Count: number, ScannedCount: number}>=> {
    return new Promise((resolve, rejects)=> {
      dynamodb.query(params,(err, data) =>{
        if (err) {
          console.log('ERROR', err)
          rejects({})
        } else {
          console.log('SUCCESS', data)
          resolve(data as {Items: MovieTypes[], Count: number, ScannedCount: number})
        }
      })
    })
  }

  const result = await promise()
  return result

}
