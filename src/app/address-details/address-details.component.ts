import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, combineLatest, map, tap, throwError } from 'rxjs';
import { RecentTransactionsBundle } from 'shared-models/alchemy-api/recent-transactions-bundle.model';
import { AlchemyService } from '../services/alchemy.service';
import { AlchemyStoreActions, AlchemyStoreSelectors, RootStoreState } from '../root-store';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent {
  
  address!: string;
  ethBalance$!: Observable<string>;
  recentTransactions$!: Observable<RecentTransactionsBundle>;
  serverRequestProcessing$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<RootStoreState.AppState>,
    private alchemyService: AlchemyService
  ) {}

  ngOnInit() {
    const address = this.route.snapshot.paramMap.get('address'); // Load address parameter
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
    this.store.dispatch(AlchemyStoreActions.fetchBalance({address}));
    this.ethBalance$ = this.alchemyService.fetchBalance(address)
      .pipe(
        map(ethBalance => {
          console.log('Loaded this ethe balance into component', ethBalance);
          return ethBalance;
        }),
        tap(ethBalance => {
          this.store.dispatch(AlchemyStoreActions.BlockApiActions.fetchBalanceSucceeded({balance: ethBalance}));  
        }),
        catchError(error => {
          const fbError: FirebaseError = {
            code: error.code,
            message: error.message,
            name: error.name
          };
          this.store.dispatch(AlchemyStoreActions.BlockApiActions.fetchBalanceFailed({error: fbError}));
          return throwError(() => new Error(error));
        })
    )
  }

  private getRecentTransactions(address: string) {
    this.store.dispatch(AlchemyStoreActions.fetchRecentTransactions({address}));
    this.recentTransactions$ = this.alchemyService.fetchRecentTransactions(address)
      .pipe(
        map(recentTransactions => {
          console.log('Loaded these recent transactions into component', recentTransactions);
          return recentTransactions;
        }),
        tap(recentTransactions => {
          this.store.dispatch(AlchemyStoreActions.BlockApiActions.fetchRecentTransactionsSucceeded({recentTransactions}));  
        }),
        catchError(error => {
          const fbError: FirebaseError = {
            code: error.code,
            message: error.message,
            name: error.name
          };
          this.store.dispatch(AlchemyStoreActions.BlockApiActions.fetchBalanceFailed({error: fbError}));
          return throwError(() => new Error(error));
        })
    )
  }
}
