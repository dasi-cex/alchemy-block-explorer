import { Injectable } from '@angular/core';
import { Functions, httpsCallableData } from '@angular/fire/functions';
import { Observable, catchError, map, take, throwError } from 'rxjs';
import { PublicFunctionNames } from 'shared-models/routes-and-paths/fb-function-names.model';
import { Block, TransactionResponse } from 'alchemy-sdk';
import { RecentTransactionsBundle } from 'shared-models/alchemy-api/recent-transactions-bundle.model';

@Injectable({
  providedIn: 'root'
})
export class AlchemyService {

  constructor(
    private functions: Functions
  ) { }

  fetchBalance(address: string): Observable<string> {
    console.log('Submitting fetchBalance to server with this address', address);

    const fetchBalanceHttpCall: (data: string) => Observable<string> = httpsCallableData(
      this.functions,
      PublicFunctionNames.ON_CALL_FETCH_BALANCE
    );
    const res = fetchBalanceHttpCall(address)
      .pipe(
        take(1),
        map(balance => {
          console.log('Fetched this balance data:', balance);
          if (!balance) {
            throw new Error(`Error fetching balance for address ${address}`);
          }
          return balance;
        }),
        catchError(error => {
          console.log('Error fetching balance', error);
          return throwError(() => new Error(error));
        })
      );

    return res;
  }

  fetchBlockData(blockNumber: string): Observable<Block> {
    console.log('Submitting getBlockData to server with this block number', blockNumber);

    const fetchBlockDataHttpCall: (data: string) => Observable<Block> = httpsCallableData(
      this.functions,
      PublicFunctionNames.ON_CALL_FETCH_BLOCK_DATA
    );
    const res = fetchBlockDataHttpCall(blockNumber)
      .pipe(
        take(1),
        map(blockData => {
          console.log('Fetched this block data:', blockData);
          if (!blockData) {
            throw new Error(`Error fetching block data for block number ${blockNumber}`);
          }
          return blockData;
        }),
        catchError(error => {
          console.log('Error fetching block data', error);
          return throwError(() => new Error(error));
        })
      );

    return res;
  }

  fetchRecentBlockNumbers(): Observable<string[]> {
    console.log('Submitting fetchRecentBlockNumbers to server');

    const fetchRecentBlockNumbersHttpCall: () => Observable<string[]> = httpsCallableData(
      this.functions,
      PublicFunctionNames.ON_CALL_FETCH_RECENT_BLOCK_NUMBERS
    );
    const res = fetchRecentBlockNumbersHttpCall()
      .pipe(
        take(1),
        map(recentBlockNumbers => {
          console.log('Fetched these recent transactions:', recentBlockNumbers);
          if (!recentBlockNumbers) {
            throw new Error(`Error fetching recent transactions`);
          }
          return recentBlockNumbers;
        }),
        catchError(error => {
          console.log('Error fetching recent transactions', error);
          return throwError(() => new Error(error));
        })
      );

    return res;
  }

  fetchRecentTransactions(address: string): Observable<RecentTransactionsBundle> {
    console.log('Submitting fetchRecentTransactions to server');

    const fetchRecentRecentTransactionsHttpCall: (address: string) => Observable<RecentTransactionsBundle> = httpsCallableData(
      this.functions,
      PublicFunctionNames.ON_CALL_FETCH_RECENT_TRANSACTIONS
    );
    const res = fetchRecentRecentTransactionsHttpCall(address)
      .pipe(
        take(1),
        map(recentRecentTransactions => {
          console.log('Fetched these recent transactions:', recentRecentTransactions);
          if (!recentRecentTransactions) {
            throw new Error(`Error fetching recent transactions`);
          }
          return recentRecentTransactions;
        }),
        catchError(error => {
          console.log('Error fetching recent transactions', error);
          return throwError(() => new Error(error));
        })
      );

    return res;
  }

  fetchTransactionData(transactionHash: string): Observable<TransactionResponse> {
    console.log('Submitting fetchTransactionData to server');

    const fetchRecentTransactionDataHttpCall: (transactionHash: string) => Observable<TransactionResponse> = httpsCallableData(
      this.functions,
      PublicFunctionNames.ON_CALL_FETCH_TRANSACTION_DATA
    );
    const res = fetchRecentTransactionDataHttpCall(transactionHash)
      .pipe(
        take(1),
        map(recentTransactionData => {
          console.log('Fetched these recent transactions:', recentTransactionData);
          if (!recentTransactionData) {
            throw new Error(`Error fetching recent transactions`);
          }
          return recentTransactionData;
        }),
        catchError(error => {
          console.log('Error fetching recent transactions', error);
          return throwError(() => new Error(error));
        })
      );

    return res;
  }

}
