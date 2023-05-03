import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlchemyService } from '../services/alchemy.service';
import { BlockActions, BlockApiActions } from '../state/alchemy.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.scss']
})
export class BlockDetailsComponent {

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private alchemyService: AlchemyService
  ) {}

  ngOnInit() {
    let blockNumber = this.route.snapshot.paramMap.get('blockNumber');
    console.log('Fetching data for this block number', blockNumber);
    if (!blockNumber) {
      console.log('No block number specified, fetching latest block');
      blockNumber = 'latest';
    }
    this.getBlockData(blockNumber);
  }

  getBlockData(blockNumber: string) {
    this.store.dispatch(BlockActions.fetchBlockData({blockNumber}));
    this.alchemyService.fetchBlockData(blockNumber)
      .subscribe(blockData => {
        this.store.dispatch(BlockApiActions.retrievedBlockData({blockData}));
        console.log('Loaded this block data into component', blockData);
      });
  }

}
