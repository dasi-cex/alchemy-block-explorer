import { createReducer, on } from '@ngrx/store';
import * as AlchemyStoreActions from './actions';
import { AlchemyState, initialAlchemyState } from './state';

export const alchemyStoreReducer = createReducer(
  initialAlchemyState,
  
  on(AlchemyStoreActions.fetchBalance, (state, {address}) => {return {...state, fetchBalanceProcessing: true, fetchBalanceError: null}}),
  on(AlchemyStoreActions.BlockApiActions.fetchBalanceFailed, (state, {error}) => {return {...state, fetchBalanceProcessing: false, fetchBalanceError: error }}),
  on(AlchemyStoreActions.BlockApiActions.fetchBalanceSucceeded, (state) => {return {...state, fetchBalanceProcessing: false}}),
  
  on(AlchemyStoreActions.fetchBlockData, (state, {blockNumber}) => {return {...state, fetchBlockDataProcessing: true, fetchBlockDataError: null}}),
  on(AlchemyStoreActions.BlockApiActions.fetchBlockDataFailed, (state, {error}) => {return {...state, fetchBlockDataProcessing: false, fetchBlockDataError: error}}),
  on(AlchemyStoreActions.BlockApiActions.fetchBlockDataSucceeded, (state) => {return {...state, fetchBlockDataProcessing: false}}),
  
  on(AlchemyStoreActions.fetchRecentBlockNumbers, (state) => {return {...state, fetchRecentBlockNumbersProcessing: true, fetchRecentBlockNumbersError: null}}),
  on(AlchemyStoreActions.BlockApiActions.fetchRecentBlockNumbersFailed, (state, {error}) => {return {...state, fetchRecentBlockNumbersProcessing: false, fetchRecentBlockNumbersError: error}}),
  on(AlchemyStoreActions.BlockApiActions.fetchRecentBlockNumbersSucceeded, (state) => {return {...state, fetchRecentBlockNumbersProcessing: false}}),
  
  on(AlchemyStoreActions.fetchRecentTransactions, (state) => {return {...state, fetchRecentTransactionsProcessing: true, fetchRecentTransactionsError: null}}),
  on(AlchemyStoreActions.BlockApiActions.fetchRecentTransactionsFailed, (state, {error}) => {return {...state, fetchRecentTransactionsProcessing: false, fetchRecentTransactionsError: error}}),
  on(AlchemyStoreActions.BlockApiActions.fetchRecentTransactionsSucceeded, (state) => {return {...state, fetchRecentTransactionsProcessing: false}}),
  
  on(AlchemyStoreActions.fetchTransactionData, (state) => {return {...state, fetchTransactionDataProcessing: true, fetchTransactionDataError: null}}),
  on(AlchemyStoreActions.BlockApiActions.fetchTransactionDataFailed, (state, {error}) => {return {...state, fetchTransactionDataProcessing: false, fetchTransactionDataError: error}}),
  on(AlchemyStoreActions.BlockApiActions.fetchTransactionDataSucceeded, (state) => {return {...state, fetchTransactionDataProcessing: false}}),
);