import * as functions from 'firebase-functions';
import { SecretsManagerKeyNames } from '../../shared-models/environments/env-vars.model';
import { alchemy } from './config';
import { Block } from 'alchemy-sdk';

const fetchBlockData = async (blockNumber: string) => {
  const blockNumberHex ='0x' + (+blockNumber).toString(16); // Convert blockNumber string into a number and then a hex value
  functions.logger.log('Created this block number hex', blockNumberHex);
  const blockData = await alchemy.core.getBlock(blockNumberHex)
    .catch(err => {functions.logger.log(`Failed to fetch block data for block ${blockNumber}:`, err); throw new functions.https.HttpsError('internal', err);});

  functions.logger.log(`fetchBlockData processed successfully, fetched block ${blockData.number} with hex ${blockNumberHex}`);
  return blockData;
}

/////// DEPLOYABLE FUNCTIONS ///////

const functionConfig: functions.RuntimeOptions = {
  secrets: [SecretsManagerKeyNames.ALCHEMY_API_KEY_MAINNET]
}

export const onCallFetchBlockData = functions.runWith(functionConfig).https.onCall( async (blockNumber, context ): Promise<Block> => {
  functions.logger.log('fetchBlockData request received with this block number', blockNumber);
  return fetchBlockData(blockNumber);
});