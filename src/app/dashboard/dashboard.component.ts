import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlchemyStoreActions, AlchemyStoreSelectors, RootStoreState } from '../root-store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  recentBlockNumbers$!: Observable<string[] | null>;
  serverRequestProcessing$!: Observable<boolean>;

  constructor(
    private store: Store<RootStoreState.AppState>,
  ) {}

  ngOnInit(): void {
    this.monitorServerRequests();
    this.getRecentBlockNumbers();
  }

  private monitorServerRequests() {
    this.serverRequestProcessing$ = this.store.select(AlchemyStoreSelectors.selectFetchRecentBlockNumbersProcessing);
  }

  private getRecentBlockNumbers() {
    this.recentBlockNumbers$ = this.store.select(AlchemyStoreSelectors.selectFetchRecentBlockNumbersResult);
    this.store.dispatch(AlchemyStoreActions.fetchRecentBlockNumbers());
  }

}
