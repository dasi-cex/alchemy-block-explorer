import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-blockexplorer';

  ngOnInit(): void {
    if (environment.production) {
      console.log('Running prod envronment');
    }
    if (!environment.production) {
      console.log('Running development environment');
    }
    
  }
}
