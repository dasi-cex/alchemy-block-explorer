import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { alchemyStoreReducer } from './reducer';
import { StoreFeatureKeys } from 'shared-models/store/feature-keys.model';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreFeatureKeys.ALCHEMY, alchemyStoreReducer),
  ]
})
export class AlchemyStoreModule { }