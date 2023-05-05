
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AlchemyState } from "./state";
import { StoreFeatureKeys } from "shared-models/store/feature-keys.model";

const getFetchBalanceError = (state: AlchemyState) => state.fetchBalanceError;
const getFetchBalanceProcessing = (state: AlchemyState) => state.fetchBalanceProcessing;
const getFetchBlockDataError = (state: AlchemyState) => state.fetchBlockDataError;
const getFetchBlockDataProcessing = (state: AlchemyState) => state.fetchBlockDataProcessing;
const getFetchRecentBlockNumbersError = (state: AlchemyState) => state.fetchRecentBlockNumbersError;
const getFetchRecentBlockNumbersProcessing = (state: AlchemyState) => state.fetchRecentBlockNumbersProcessing;
const getFetchRecentTransactionsError = (state: AlchemyState) => state.fetchRecentTransactionsError;
const getFetchRecentTransactionsProcessing = (state: AlchemyState) => state.fetchRecentTransactionsProcessing;
const getFetchTransactionDataError = (state: AlchemyState) => state.fetchTransactionDataError;
const getFetchTransactionDataProcessing = (state: AlchemyState) => state.fetchTransactionDataProcessing;

const selectAlchemyState = createFeatureSelector<AlchemyState>(StoreFeatureKeys.ALCHEMY);

export const selectFetchBalanceError = createSelector(
  selectAlchemyState,
  getFetchBalanceError
);

export const selectFetchBalanceProcessing = createSelector(
  selectAlchemyState,
  getFetchBalanceProcessing
);

export const selectFetchBlockDataError = createSelector(
  selectAlchemyState,
  getFetchBlockDataError
);

export const selectFetchBlockDataProcessing = createSelector(
  selectAlchemyState,
  getFetchBlockDataProcessing
);

export const selectFetchRecentBlockNumbersError = createSelector(
  selectAlchemyState,
  getFetchRecentBlockNumbersError
);

export const selectFetchRecentBlockNumbersProcessing = createSelector(
  selectAlchemyState,
  getFetchRecentBlockNumbersProcessing
);

export const selectFetchRecentTransactionsError = createSelector(
  selectAlchemyState,
  getFetchRecentTransactionsError
);

export const selectFetchRecentTransactionsProcessing = createSelector(
  selectAlchemyState,
  getFetchRecentTransactionsProcessing
);

export const selectFetchTransactionDataError = createSelector(
  selectAlchemyState,
  getFetchTransactionDataError
);

export const selectFetchTransactionDataProcessing = createSelector(
  selectAlchemyState,
  getFetchTransactionDataProcessing
);