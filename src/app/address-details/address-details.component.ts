import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { RecentTransactionsBundle } from 'shared-models/alchemy-api/recent-transactions-bundle.model';
import { AlchemyStoreActions, AlchemyStoreSelectors, RootStoreState } from '../root-store';
import { UrlParamKeys } from 'shared-models/routes-and-paths/url-param-keys.model';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent {
  
  address!: string;
  ethBalance$!: Observable<string | null>;
  recentTransactions$!: Observable<RecentTransactionsBundle | null>;
  serverRequestProcessing$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<RootStoreState.AppState>,
  ) {}

  ngOnInit() {
    const address = this.route.snapshot.paramMap.get(UrlParamKeys.ADDRESS); // Load address parameter
    console.log('Fetching data for this address', address);
    if (!address) {
      console.log('No address parameter found, navigating to home');
      this.router.navigateByUrl('/');
      return;
    }
    this.address = address;
    this.monitorServerRequests();
    this.getBalance(address);
    this.getRecentTransactions(address);
  }

  private monitorServerRequests() {
    this.serverRequestProcessing$ = combineLatest(
      [
        this.store.select(AlchemyStoreSelectors.selectFetchBalanceError),
        this.store.select(AlchemyStoreSelectors.selectFetchRecentTransactionsProcessing),
      ]
    ).pipe(
        map(([fetchingBalance, fetchingRecentTransactions]) => {
          if (fetchingBalance || fetchingRecentTransactions) {
            return true
          }
          return false
        })
    );
  }

  private getBalance(address: string) {
    this.ethBalance$ = this.store.select(AlchemyStoreSelectors.selectFetchBalanceResult);
    this.store.dispatch(AlchemyStoreActions.fetchBalance({address}));
  }

  private getRecentTransactions(address: string) {
    this.recentTransactions$ = this.store.select(AlchemyStoreSelectors.selectFetchRecentTransactionsResult);
    this.store.dispatch(AlchemyStoreActions.fetchRecentTransactions({address}));
  }
}
