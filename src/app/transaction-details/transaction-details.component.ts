import { Component } from '@angular/core';
import { AlchemyStoreActions, AlchemyStoreSelectors, RootStoreState } from '../root-store';
import { TransactionResponse, Utils } from 'alchemy-sdk';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UrlParamKeys } from 'shared-models/routes-and-paths/url-param-keys.model';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent {

  transactionHash!: string;
  transactionData$!: Observable< TransactionResponse | null>;
  transactionValue!: number | undefined;
  gasPrice!: number | undefined;

  serverRequestProcessing$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<RootStoreState.AppState>,
  ) {}

  ngOnInit() {
    const transactionHash = this.route.snapshot.paramMap.get(UrlParamKeys.TRANSACTION_HASH); // Load in blocknumber parameter if it exists
    console.log('Fetching data for this transactionHash', transactionHash);
    if (!transactionHash) {
      console.log('No transactionHash parameter found, navigating to home');
      this.router.navigateByUrl('/');
      return;
    }
    this.transactionHash = transactionHash;
    this.monitorServerRequests();
    this.getTransactionData(transactionHash);
  }

  private monitorServerRequests() {
    this.serverRequestProcessing$ = this.store.select(AlchemyStoreSelectors.selectFetchTransactionDataProcessing);
  }

  private getTransactionData(transactionHash: string) {
    this.transactionData$ = this.store.select(AlchemyStoreSelectors.selectFetchTransactionDataResult)
      .pipe(tap(transactionData => {
        let valueAsNumber;
        let gasPriceAsNumber;
        if (transactionData?.value) {
          valueAsNumber = +Utils.formatEther(transactionData?.value);
        }
        if (transactionData?.gasPrice) {
          gasPriceAsNumber = +Utils.formatUnits(transactionData.gasPrice, 'gwei');
        }
        this.transactionValue = valueAsNumber;
        this.gasPrice = gasPriceAsNumber;
      }));
    this.store.dispatch(AlchemyStoreActions.fetchTransactionData({transactionHash}));
  }

}
