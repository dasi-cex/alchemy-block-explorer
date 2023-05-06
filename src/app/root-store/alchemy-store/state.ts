import { FirebaseError } from "@angular/fire/app";
import { Block, TransactionResponse } from 'alchemy-sdk';
import { RecentTransactionsBundle } from "shared-models/alchemy-api/recent-transactions-bundle.model";

export interface AlchemyState {
  fetchBalanceError: FirebaseError | Error | null,
  fetchBalanceProcessing: boolean,
  fetchBalanceResult: string | null,
  fetchBlockDataError: FirebaseError | Error | null,
  fetchBlockDataProcessing: boolean,
  fetchBlockDataResult: Block | null,
  fetchRecentBlockNumbersError: FirebaseError | Error | null,
  fetchRecentBlockNumbersProcessing: boolean,
  fetchRecentBlockNumbersResult: string[] | null,
  fetchRecentTransactionsError: FirebaseError | Error | null,
  fetchRecentTransactionsProcessing: boolean,
  fetchRecentTransactionsResult: RecentTransactionsBundle | null,
  fetchTransactionDataError: FirebaseError | Error | null,
  fetchTransactionDataProcessing: boolean,
  fetchTransactionDataResult: TransactionResponse | null,
}

export const initialAlchemyState: AlchemyState = {
  fetchBalanceError: null,
  fetchBalanceProcessing: false,
  fetchBalanceResult: null,
  fetchBlockDataError: null,
  fetchBlockDataProcessing: false,
  fetchBlockDataResult: null,
  fetchRecentBlockNumbersError: null,
  fetchRecentBlockNumbersProcessing: false,
  fetchRecentBlockNumbersResult: null,
  fetchRecentTransactionsError: null,
  fetchRecentTransactionsProcessing: false,
  fetchRecentTransactionsResult: null,
  fetchTransactionDataError: null,
  fetchTransactionDataProcessing: false,
  fetchTransactionDataResult: null,
};