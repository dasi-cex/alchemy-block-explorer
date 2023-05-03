import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFunctions,getFunctions, connectFunctionsEmulator } from '@angular/fire/functions';
import { BlockDetailsComponent } from './block-details/block-details.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { StoreModule } from '@ngrx/store';
import { alchemyReducer } from './state/alchemy.reducer';

@NgModule({
  declarations: [
    AppComponent,
    BlockDetailsComponent,
    TransactionDetailsComponent,
    AccountDetailsComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFunctions(() => {
      const functions = getFunctions();
      if(!environment.production) {
        connectFunctionsEmulator(functions, 'localhost', 5001);
      }
      return functions;
    }),
    StoreModule.forRoot({alchemyData: alchemyReducer}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
