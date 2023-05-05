import * as functions from 'firebase-functions';
import { SecretsManagerKeyNames } from '../../shared-models/environments/env-vars.model';
import { alchemy } from './config';
import { TransactionResponse } from 'alchemy-sdk';

const fetchTransactionData = async (transactionHash: string) => {
  const transactionData = await alchemy.core.getTransaction(transactionHash)
    .catch(err => {functions.logger.log(`Failed to fetch transaction data:`, err); throw new functions.https.HttpsError('internal', err);});

  functions.logger.log(`fetchTransactionData processed successfully with this response`, transactionData);
  return transactionData;
}

/////// DEPLOYABLE FUNCTIONS ///////

const functionConfig: functions.RuntimeOptions = {
  secrets: [SecretsManagerKeyNames.ALCHEMY_API_KEY_MAINNET]
}

export const onCallFetchTransactionData = functions.runWith(functionConfig).https.onCall( async (transactionHash: string, context ): Promise<TransactionResponse> => {
  functions.logger.log('fetchTransactionData request received with this transaction hash', transactionHash);
  const transactionData = await fetchTransactionData(transactionHash);
  if (!transactionData) {
    throw new functions.https.HttpsError('not-found', 'Transaction not found.');
  }
  return transactionData;
});