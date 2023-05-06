import { Injectable } from "@angular/core";
import { FirebaseError } from "@angular/fire/app";
import { catchError, concatMap, map, switchMap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import * as AlchemyStoreActions from "./actions";
import { AlchemyService } from "src/app/services/alchemy.service";

@Injectable()
export class AlchemyStoreEffects {

  constructor(
    private actions$: Actions,
    private alchemyService: AlchemyService,
  ) { }

  fetchBalanceEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AlchemyStoreActions.fetchBalance),
      switchMap(action => 
        this.alchemyService.fetchBalance(action.address).pipe(
          map(balance => {
            return AlchemyStoreActions.BlockApiActions.fetchBalanceSucceeded({balance});
          }),
          catchError(error => {
            const fbError: FirebaseError = {
              code: error.code,
              message: error.message,
              name: error.name
            };
            return of(AlchemyStoreActions.BlockApiActions.fetchBalanceFailed({error: fbError}));
          })
        )
      ),
    ),
  );

  fetchBlockDataEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AlchemyStoreActions.fetchBlockData),
      switchMap(action => 
        this.alchemyService.fetchBlockData(action.blockNumber).pipe(
          map(blockData => {
            return AlchemyStoreActions.BlockApiActions.fetchBlockDataSucceeded({blockData});
          }),
          catchError(error => {
            const fbError: FirebaseError = {
              code: error.code,
              message: error.message,
              name: error.name
            };
            return of(AlchemyStoreActions.BlockApiActions.fetchBlockDataFailed({error: fbError}));
          })
        )
      ),
    ),
  );

  fetchRecentBlockNumbersEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AlchemyStoreActions.fetchRecentBlockNumbers),
      switchMap(action => 
        this.alchemyService.fetchRecentBlockNumbers().pipe(
          map(recentBlockNumbers => {
            return AlchemyStoreActions.BlockApiActions.fetchRecentBlockNumbersSucceeded({recentBlockNumbers});
          }),
          catchError(error => {
            const fbError: FirebaseError = {
              code: error.code,
              message: error.message,
              name: error.name
            };
            return of(AlchemyStoreActions.BlockApiActions.fetchRecentBlockNumbersFailed({error: fbError}));
          })
        )
      ),
    ),
  );

  fetchRecentTransactionsEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AlchemyStoreActions.fetchRecentTransactions),
      switchMap(action => 
        this.alchemyService.fetchRecentTransactions(action.address).pipe(
          map(recentTransactions => {
            return AlchemyStoreActions.BlockApiActions.fetchRecentTransactionsSucceeded({recentTransactions});
          }),
          catchError(error => {
            const fbError: FirebaseError = {
              code: error.code,
              message: error.message,
              name: error.name
            };
            return of(AlchemyStoreActions.BlockApiActions.fetchRecentTransactionsFailed({error: fbError}));
          })
        )
      ),
    ),
  );

  fetchTransactionDataEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AlchemyStoreActions.fetchTransactionData),
      switchMap(action => 
        this.alchemyService.fetchTransactionData(action.transactionHash).pipe(
          map(transactionData => {
            return AlchemyStoreActions.BlockApiActions.fetchTransactionDataSucceeded({transactionData});
          }),
          catchError(error => {
            const fbError: FirebaseError = {
              code: error.code,
              message: error.message,
              name: error.name
            };
            return of(AlchemyStoreActions.BlockApiActions.fetchTransactionDataFailed({error: fbError}));
          })
        )
      ),
    ),
  );

}