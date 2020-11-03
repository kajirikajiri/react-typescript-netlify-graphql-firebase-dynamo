const {
REACT_APP_DYNAMO_ACCESS_KEY_ID,
REACT_APP_DYNAMO_REGION,
REACT_APP_DYNAMO_SECRET_ACCESS_KEY,
} = process.env

export default {
  region: REACT_APP_DYNAMO_REGION,
  accessKeyId: REACT_APP_DYNAMO_ACCESS_KEY_ID,
  secretAccessKey: REACT_APP_DYNAMO_SECRET_ACCESS_KEY
}