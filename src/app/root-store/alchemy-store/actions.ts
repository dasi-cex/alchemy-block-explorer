import { FirebaseError } from '@angular/fire/app';
import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Block, TransactionResponse } from 'alchemy-sdk';
import { RecentTransactionsBundle } from 'shared-models/alchemy-api/recent-transactions-bundle.model';

// Fetch Actions

export const fetchBalance = createAction(
  '[Address Details Component] Fetch Balance',
  props<{ address: string }>()
);

export const fetchBlockData = createAction(
  '[Block Details Component] Fetch Block Data',
  props<{ blockNumber: string }>()
);

export const fetchRecentBlockNumbers = createAction(
  '[Dashboard Component] Fetch Recent Block Numbers'
);

export const fetchRecentTransactions = createAction(
  '[Address Details Component] Fetch Recent Transactions',
  props<{ address: string }>()
);

export const fetchTransactionData = createAction(
  '[Transaction Details Component] Fetch Transaction Data',
  props<{ transactionHash: string }>()
);

// Reponse Actions

export const BlockApiActions = createActionGroup({
  source: 'Alchemy API',
  events: {
    'Fetch Balance Succeeded': props<{ balance: string }>(),
    'Fetch Balance Failed': props<{ error: FirebaseError }>(),
    'Fetch Block Data Succeeded': props<{ blockData: Block }>(),
    'Fetch Block Data Failed': props<{ error: FirebaseError }>(),
    'Fetch Recent Block Numbers Succeeded': props<{ recentBlockNumbers: string[] }>(),
    'Fetch Recent Block Numbers Failed': props<{ error: FirebaseError }>(),
    'Fetch Recent Transactions Succeeded': props<{ recentTransactions: RecentTransactionsBundle }>(),
    'Fetch Recent Transactions Failed': props<{ error: FirebaseError }>(),
    'Fetch Transaction Data Succeeded': props<{ transactionData: TransactionResponse }>(),
    'Fetch Transaction Data Failed': props<{ error: FirebaseError }>(),
  },
});