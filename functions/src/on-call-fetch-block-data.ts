import * as functions from 'firebase-functions';

/////// DEPLOYABLE FUNCTIONS ///////

const fetchBlockData = async () => {
  const message = 'Newer Hello from Cloud Functions!';
  console.log('fetchBlockData processed with this response', message);
  return message;
}


export const onCallFetchBlockData = functions.https.onCall( async (data, context ): Promise<string> => {
  functions.logger.log('getBlockNumber received with this data', data);
  return fetchBlockData();
});