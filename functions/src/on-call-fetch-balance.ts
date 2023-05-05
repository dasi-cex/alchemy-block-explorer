import * as functions from 'firebase-functions';
import { SecretsManagerKeyNames } from '../../shared-models/environments/env-vars.model';
import { alchemy } from './config';
import { Utils } from 'alchemy-sdk';

const fetchBalance = async (address: string) => {
  const balance = await alchemy.core.getBalance(address)
    .catch(err => {functions.logger.log(`Failed to fetch balance for address ${address}:`, err); throw new functions.https.HttpsError('internal', err);});
  const balanceInEth = Utils.formatEther(balance);

  functions.logger.log(`fetchBalance processed successfully, balance is`, balanceInEth);
  return balanceInEth;
}

/////// DEPLOYABLE FUNCTIONS ///////

const functionConfig: functions.RuntimeOptions = {
  secrets: [SecretsManagerKeyNames.ALCHEMY_API_KEY_MAINNET]
}

export const onCallFetchBalance = functions.runWith(functionConfig).https.onCall( async (address, context ): Promise<string> => {
  functions.logger.log('fetchBalance request received with this address:', address);
  return fetchBalance(address);
});