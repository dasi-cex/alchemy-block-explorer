import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { AlchemyService } from '../services/alchemy.service';
import { BlockApiActions, fetchRecentBlockNumbers } from '../state/alchemy.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  recentBlockNumbers$!: Observable<string[]>;

  constructor(
    private store: Store,
    private alchemyService: AlchemyService
  ) {}

  // TODO: Load the most recent 10 blocks for the user to click on and explore

  ngOnInit(): void {
    this.getRecentBlockNumbers();
  }

  private getRecentBlockNumbers() {
    this.store.dispatch(fetchRecentBlockNumbers());
    this.recentBlockNumbers$ = this.alchemyService.fetchRecentBlockNumbers()
      .pipe(
        map(recentBlockNumbers => {
          console.log('Loaded this block data into component', recentBlockNumbers);
          return recentBlockNumbers;
        }),
        tap(recentBlockNumbers => {
          this.store.dispatch(BlockApiActions.retrievedRecentBlockNumbers({recentBlockNumbers}));  
        })
    )
  }

}
