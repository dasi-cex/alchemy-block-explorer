import * as functions from 'firebase-functions';
import { SecretsManagerKeyNames } from '../../shared-models/environments/env-vars.model';
import { Network, Alchemy, Block } from "alchemy-sdk";

const fetchBlockData = async () => {
  const alchemyApiKey = process.env[SecretsManagerKeyNames.ALCHEMY_API_KEY_MAINNET];

  const settings = {
    apiKey: alchemyApiKey,
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(settings);
  
  const blockData = await alchemy.core.getBlock(15221026);

  console.log('fetchBlockData processed successfully, fetched this block', blockData.number);
  return blockData;
}

/////// DEPLOYABLE FUNCTIONS ///////

const functionConfig: functions.RuntimeOptions = {
  secrets: [SecretsManagerKeyNames.ALCHEMY_API_KEY_MAINNET]
}

export const onCallFetchBlockData = functions.runWith(functionConfig).https.onCall( async (data, context ): Promise<Block> => {
  functions.logger.log('getBlockNumber received with this data', data);
  return fetchBlockData();
});