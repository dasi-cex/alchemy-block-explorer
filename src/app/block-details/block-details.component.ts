import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Block } from 'alchemy-sdk';
import { AlchemyStoreActions, AlchemyStoreSelectors, RootStoreState } from '../root-store';
import { UrlParamKeys } from 'shared-models/routes-and-paths/url-param-keys.model';

@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.scss']
})
export class BlockDetailsComponent {

  blockData$!: Observable<Block | null>;

  serverRequestProcessing$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<RootStoreState.AppState>,
  ) {}

  ngOnInit() {
    let blockNumber = this.route.snapshot.paramMap.get(UrlParamKeys.BLOCK_NUMBER); // Load in blocknumber parameter if it exists
    console.log('Fetching data for this block number', blockNumber);
    if (!blockNumber) {
      console.log('No block number specified, fetching latest block');
      blockNumber = 'latest';
    }
    this.monitorServerRequests();
    this.getBlockData(blockNumber);
  }

  private monitorServerRequests() {
    this.serverRequestProcessing$ = this.store.select(AlchemyStoreSelectors.selectFetchBlockDataProcessing);
  }

  private getBlockData(blockNumber: string) {
    this.blockData$ = this.store.select(AlchemyStoreSelectors.selectFetchBlockDataResult);
    this.store.dispatch(AlchemyStoreActions.fetchBlockData({blockNumber}));
  }

}
