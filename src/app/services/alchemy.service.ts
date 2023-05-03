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
            throw new Error(`Error fetching block data: ${blockData}`);
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

}
