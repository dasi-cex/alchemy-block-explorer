import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AlchemyService } from '../services/alchemy.service';
import { AlchemyStoreActions, RootStoreState } from '../root-store';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  recentBlockNumbers$!: Observable<string[]>;

  constructor(
    private store: Store<RootStoreState.AppState>,
    private alchemyService: AlchemyService
  ) {}

  // TODO: Load the most recent 10 blocks for the user to click on and explore

  ngOnInit(): void {
    this.getRecentBlockNumbers();
  }

  private getRecentBlockNumbers() {
    this.store.dispatch(AlchemyStoreActions.fetchRecentBlockNumbers());
    this.recentBlockNumbers$ = this.alchemyService.fetchRecentBlockNumbers()
      .pipe(
        map(recentBlockNumbers => {
          console.log('Loaded this block data into component', recentBlockNumbers);
          return recentBlockNumbers;
        }),
        tap(recentBlockNumbers => {
          this.store.dispatch(AlchemyStoreActions.BlockApiActions.fetchRecentBlockNumbersSucceeded({recentBlockNumbers}));  
        }),
        catchError(error => {
          const fbError: FirebaseError = {
            code: error.code,
            message: error.message,
            name: error.name
          };
          this.store.dispatch(AlchemyStoreActions.BlockApiActions.fetchRecentBlockNumbersFailed({error: fbError}));
          return throwError(() => new Error(error));
        })
    )
  }

}
