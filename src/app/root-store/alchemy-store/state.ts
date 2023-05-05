import { FirebaseError } from "@angular/fire/app";

export interface AlchemyState {
  fetchBalanceError: FirebaseError | Error | null,
  fetchBalanceProcessing: boolean,
  fetchBlockDataError: FirebaseError | Error | null,
  fetchBlockDataProcessing: boolean,
  fetchRecentBlockNumbersError: FirebaseError | Error | null,
  fetchRecentBlockNumbersProcessing: boolean,
  fetchRecentTransactionsError: FirebaseError | Error | null,
  fetchRecentTransactionsProcessing: boolean,
  fetchTransactionDataError: FirebaseError | Error | null,
  fetchTransactionDataProcessing: boolean,
}

export const initialAlchemyState: AlchemyState = {
  fetchBalanceError: null,
  fetchBalanceProcessing: false,
  fetchBlockDataError: null,
  fetchBlockDataProcessing: false,
  fetchRecentBlockNumbersError: null,
  fetchRecentBlockNumbersProcessing: false,
  fetchRecentTransactionsError: null,
  fetchRecentTransactionsProcessing: false,
  fetchTransactionDataError: null,
  fetchTransactionDataProcessing: false,
};