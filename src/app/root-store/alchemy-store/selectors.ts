
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AlchemyState } from "./state";
import { StoreFeatureKeys } from "shared-models/store/feature-keys.model";

const getFetchBalanceError = (state: AlchemyState) => state.fetchBalanceError;
const getFetchBalanceProcessing = (state: AlchemyState) => state.fetchBalanceProcessing;
const getFetchBalanceResult = (state: AlchemyState) => state.fetchBalanceResult;
const getFetchBlockDataError = (state: AlchemyState) => state.fetchBlockDataError;
const getFetchBlockDataProcessing = (state: AlchemyState) => state.fetchBlockDataProcessing;
const getFetchBlockDataResult = (state: AlchemyState) => state.fetchBlockDataResult;
const getFetchRecentBlockNumbersError = (state: AlchemyState) => state.fetchRecentBlockNumbersError;
const getFetchRecentBlockNumbersProcessing = (state: AlchemyState) => state.fetchRecentBlockNumbersProcessing;
const getFetchRecentBlockNumbersResult = (state: AlchemyState) => state.fetchRecentBlockNumbersResult;
const getFetchRecentTransactionsError = (state: AlchemyState) => state.fetchRecentTransactionsError;
const getFetchRecentTransactionsProcessing = (state: AlchemyState) => state.fetchRecentTransactionsProcessing;
const getFetchRecentTransactionsResult = (state: AlchemyState) => state.fetchRecentTransactionsResult;
const getFetchTransactionDataError = (state: AlchemyState) => state.fetchTransactionDataError;
const getFetchTransactionDataProcessing = (state: AlchemyState) => state.fetchTransactionDataProcessing;
const getFetchTransactionDataResult = (state: AlchemyState) => state.fetchTransactionDataResult;

const selectAlchemyState = createFeatureSelector<AlchemyState>(StoreFeatureKeys.ALCHEMY);

export const selectFetchBalanceError = createSelector(
  selectAlchemyState,
  getFetchBalanceError
);

export const selectFetchBalanceProcessing = createSelector(
  selectAlchemyState,
  getFetchBalanceProcessing
);

export const selectFetchBalanceResult = createSelector(
  selectAlchemyState,
  getFetchBalanceResult
);

export const selectFetchBlockDataError = createSelector(
  selectAlchemyState,
  getFetchBlockDataError
);

export const selectFetchBlockDataProcessing = createSelector(
  selectAlchemyState,
  getFetchBlockDataProcessing
);

export const selectFetchBlockDataResult = createSelector(
  selectAlchemyState,
  getFetchBlockDataResult
);

export const selectFetchRecentBlockNumbersError = createSelector(
  selectAlchemyState,
  getFetchRecentBlockNumbersError
);

export const selectFetchRecentBlockNumbersProcessing = createSelector(
  selectAlchemyState,
  getFetchRecentBlockNumbersProcessing
);

export const selectFetchRecentBlockNumbersResult = createSelector(
  selectAlchemyState,
  getFetchRecentBlockNumbersResult
);

export const selectFetchRecentTransactionsError = createSelector(
  selectAlchemyState,
  getFetchRecentTransactionsError
);

export const selectFetchRecentTransactionsProcessing = createSelector(
  selectAlchemyState,
  getFetchRecentTransactionsProcessing
);

export const selectFetchRecentTransactionsResult = createSelector(
  selectAlchemyState,
  getFetchRecentTransactionsResult
);

export const selectFetchTransactionDataError = createSelector(
  selectAlchemyState,
  getFetchTransactionDataError
);

export const selectFetchTransactionDataProcessing = createSelector(
  selectAlchemyState,
  getFetchTransactionDataProcessing
);

export const selectFetchTransactionDataResult = createSelector(
  selectAlchemyState,
  getFetchTransactionDataResult
);