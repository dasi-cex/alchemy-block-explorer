import { AssetTransfersResult } from 'alchemy-sdk';

export interface RecentTransactionsBundle {
  receivedTransactions: AssetTransfersResult[],
  sentTransactions: AssetTransfersResult[]
}