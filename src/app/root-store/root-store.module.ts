import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { AlchemyStoreModule } from './alchemy-store/alchemy-store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer, RouterState } from '@ngrx/router-store';
import { reducers } from './root-store.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlchemyStoreModule,
    StoreModule.forRoot(
        reducers, 
        { 
          runtimeChecks: {
            strictStateSerializability: true,
            strictActionSerializability: true,
            strictActionTypeUniqueness: true,
        }
      }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
  ],

})
export class RootStoreModule { }