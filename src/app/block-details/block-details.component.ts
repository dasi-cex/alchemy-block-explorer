import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlchemyService } from '../services/alchemy.service';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Block } from 'alchemy-sdk';
import { AlchemyStoreActions, RootStoreState } from '../root-store';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.scss']
})
export class BlockDetailsComponent {

  blockData$!: Observable<Block>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<RootStoreState.AppState>,
    private alchemyService: AlchemyService
  ) {}

  ngOnInit() {
    let blockNumber = this.route.snapshot.paramMap.get('blockNumber'); // Load in blocknumber parameter if it exists
    console.log('Fetching data for this block number', blockNumber);
    if (!blockNumber) {
      console.log('No block number specified, fetching latest block');
      blockNumber = 'latest';
    }
    this.getBlockData(blockNumber);
  }

  private getBlockData(blockNumber: string) {
    this.store.dispatch(AlchemyStoreActions.fetchBlockData({blockNumber}));
    this.blockData$ = this.alchemyService.fetchBlockData(blockNumber)
      .pipe(
        map(blockData => {
          console.log('Loaded this block data into component', blockData);
          return blockData;
        }),
        tap(blockData => {
          this.store.dispatch(AlchemyStoreActions.BlockApiActions.fetchBlockDataSucceeded({blockData}));  
        }),
        catchError(error => {
          const fbError: FirebaseError = {
            code: error.code,
            message: error.message,
            name: error.name
          };
          this.store.dispatch(AlchemyStoreActions.BlockApiActions.fetchBlockDataFailed({error: fbError}));
          return throwError(() => new Error(error));
        })
    )
  }

}
