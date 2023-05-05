import { Injectable } from '@angular/core';
import { Functions, httpsCallableData } from '@angular/fire/functions';
import { Observable, catchError, map, take, throwError } from 'rxjs';
import { PublicFunctionNames } from 'shared-models/routes-and-paths/fb-function-names.model';
import { Block } from 'alchemy-sdk';

@Injectable({
  providedIn: 'root'
})
export class AlchemyService {

  constructor(
    private functions: Functions
  ) { }


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
    console.log('Submitting getRecentBlockNumbers to server');

    const fetchRecentBlockNumbersHttpCall: () => Observable<string[]> = httpsCallableData(
      this.functions,
      PublicFunctionNames.ON_CALL_FETCH_RECENT_BLOCK_NUMBERS
    );
    const res = fetchRecentBlockNumbersHttpCall()
      .pipe(
        take(1),
        map(recentBlockNumbers => {
          console.log('Fetched these recent block numbers:', recentBlockNumbers);
          if (!recentBlockNumbers) {
            throw new Error(`Error fetching recent block numbers`);
          }
          return recentBlockNumbers;
        }),
        catchError(error => {
          console.log('Error fetching recent block numbers', error);
          return throwError(() => new Error(error));
        })
      );

    return res;
  }

}
