import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlchemyService } from '../services/alchemy.service';
import { BlockApiActions, fetchBlockData } from '../state/alchemy.actions';
import { Observable, map, tap } from 'rxjs';
import { Block } from 'alchemy-sdk';

@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.scss']
})
export class BlockDetailsComponent {

  blockData$!: Observable<Block>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
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
    this.store.dispatch(fetchBlockData({blockNumber}));
    this.blockData$ = this.alchemyService.fetchBlockData(blockNumber)
      .pipe(
        map(blockData => {
          console.log('Loaded this block data into component', blockData);
          return blockData;
        }),
        tap(blockData => {
          this.store.dispatch(BlockApiActions.retrievedBlockData({blockData}));  
        })
    )
  }

}
