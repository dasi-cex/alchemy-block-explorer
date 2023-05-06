import { createReducer, on } from '@ngrx/store';
import * as AlchemyStoreActions from './actions';
import { initialAlchemyState } from './state';

export const alchemyStoreReducer = createReducer(
  initialAlchemyState,
  
  on(AlchemyStoreActions.fetchBalance, (state, {address}) => {return {...state, fetchBalanceProcessing: true, fetchBalanceError: null, fetchBalanceResult: null}}),
  on(AlchemyStoreActions.BlockApiActions.fetchBalanceFailed, (state, {error}) => {return {...state, fetchBalanceProcessing: false, fetchBalanceError: error }}),
  on(AlchemyStoreActions.BlockApiActions.fetchBalanceSucceeded, (state, {balance}) => {return {...state, fetchBalanceProcessing: false, fetchBalanceResult: balance}}),
  
  on(AlchemyStoreActions.fetchBlockData, (state, {blockNumber}) => {return {...state, fetchBlockDataProcessing: true, fetchBlockDataError: null, fetchBlockDataResult: null}}),
  on(AlchemyStoreActions.BlockApiActions.fetchBlockDataFailed, (state, {error}) => {return {...state, fetchBlockDataProcessing: false, fetchBlockDataError: error}}),
  on(AlchemyStoreActions.BlockApiActions.fetchBlockDataSucceeded, (state, {blockData}) => {return {...state, fetchBlockDataProcessing: false, fetchBlockDataResult: blockData}}),
  
  on(AlchemyStoreActions.fetchRecentBlockNumbers, (state) => {return {...state, fetchRecentBlockNumbersProcessing: true, fetchRecentBlockNumbersError: null, fetchRecentBlockNumbersResult: null}}),
  on(AlchemyStoreActions.BlockApiActions.fetchRecentBlockNumbersFailed, (state, {error}) => {return {...state, fetchRecentBlockNumbersProcessing: false, fetchRecentBlockNumbersError: error}}),
  on(AlchemyStoreActions.BlockApiActions.fetchRecentBlockNumbersSucceeded, (state, {recentBlockNumbers}) => {return {...state, fetchRecentBlockNumbersProcessing: false, fetchRecentBlockNumbersResult: recentBlockNumbers}}),
  
  on(AlchemyStoreActions.fetchRecentTransactions, (state) => {return {...state, fetchRecentTransactionsProcessing: true, fetchRecentTransactionsError: null, fetchRecentTransactionsResult: null}}),
  on(AlchemyStoreActions.BlockApiActions.fetchRecentTransactionsFailed, (state, {error}) => {return {...state, fetchRecentTransactionsProcessing: false, fetchRecentTransactionsError: error}}),
  on(AlchemyStoreActions.BlockApiActions.fetchRecentTransactionsSucceeded, (state, {recentTransactions}) => {return {...state, fetchRecentTransactionsProcessing: false, fetchRecentTransactionsResult: recentTransactions}}),
  
  on(AlchemyStoreActions.fetchTransactionData, (state) => {return {...state, fetchTransactionDataProcessing: true, fetchTransactionDataError: null, fetchTransactionDataResult: null}}),
  on(AlchemyStoreActions.BlockApiActions.fetchTransactionDataFailed, (state, {error}) => {return {...state, fetchTransactionDataProcessing: false, fetchTransactionDataError: error}}),
  on(AlchemyStoreActions.BlockApiActions.fetchTransactionDataSucceeded, (state, {transactionData}) => {return {...state, fetchTransactionDataProcessing: false, fetchTransactionDataResult: transactionData}}),
);