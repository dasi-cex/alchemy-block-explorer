import * as functions from 'firebase-functions';
import { SecretsManagerKeyNames } from '../../shared-models/environments/env-vars.model';
import { alchemy } from './config';
import { AssetTransfersCategory, SortingOrder } from 'alchemy-sdk';
import { RecentTransactionsBundle } from '../../shared-models/alchemy-api/recent-transactions-bundle.model';

const getLatestTransactionsToAddress = async (address: string) => {
  const transactionList = await alchemy.core.getAssetTransfers({
    toAddress: address,
    category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.INTERNAL, AssetTransfersCategory.ERC20, AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155 ],
    excludeZeroValue: true,
    order: SortingOrder.DESCENDING,
    maxCount: 10
  }).catch(err => {functions.logger.log(`Failed to fetch latest transactions TO ${address}:`, err); throw new functions.https.HttpsError('internal', err);});
  functions.logger.log(`Found ${transactionList.transfers.length} recent transactions TO ${address}:`, transactionList.transfers.length);
  return transactionList;
}

const getLatestTransactionsFromAddress = async (address: string) => {
  const transactionList = await alchemy.core.getAssetTransfers({
    fromAddress: address,
    category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.INTERNAL, AssetTransfersCategory.ERC20, AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155 ],
    excludeZeroValue: true,
    order: SortingOrder.DESCENDING,
    maxCount: 10
  }).catch(err => {functions.logger.log(`Failed to fetch latest transactions FROM ${address}:`, err); throw new functions.https.HttpsError('internal', err);});
  functions.logger.log(`Found ${transactionList.transfers.length} recent transactions FROM ${address}:`, transactionList.transfers.length);
  return transactionList;
}

const generateRecentTransactionBundle = async (address: string) => {
  const receivedTransactions = (await getLatestTransactionsToAddress(address)).transfers;
  const sentTransactions = (await getLatestTransactionsFromAddress(address)).transfers;
  const recentTransactionBundle: RecentTransactionsBundle = {
    receivedTransactions,
    sentTransactions
  };
  return recentTransactionBundle;

}

/////// DEPLOYABLE FUNCTIONS ///////

const functionConfig: functions.RuntimeOptions = {
  secrets: [SecretsManagerKeyNames.ALCHEMY_API_KEY_MAINNET]
}

export const onCallFetchRecentTransactions = functions.runWith(functionConfig).https.onCall( async (address, context ): Promise<RecentTransactionsBundle> => {
  functions.logger.log('fetchRecentTransactions request received with this address:', address);
  const recentTransactions = generateRecentTransactionBundle(address);
  return recentTransactions;
});