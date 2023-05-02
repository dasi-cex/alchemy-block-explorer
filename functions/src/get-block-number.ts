import * as functions from 'firebase-functions';

/////// DEPLOYABLE FUNCTIONS ///////

const getBlockNumber = async () => {
  const message = 'Hello from Cloud Functions!';
  console.log('getBlockNumberProcessed with this response', message);
  return message;
}


export const onGetBlockNumber = functions.https.onCall( async (data, context ): Promise<string> => {
  functions.logger.log('getBlockNumber received with this data', data);
  return getBlockNumber();
});