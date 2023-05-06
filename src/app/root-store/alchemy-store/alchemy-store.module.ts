import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { alchemyStoreReducer } from './reducer';
import { StoreFeatureKeys } from 'shared-models/store/feature-keys.model';
import { EffectsModule } from '@ngrx/effects';
import { AlchemyStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreFeatureKeys.ALCHEMY, alchemyStoreReducer),
    EffectsModule.forFeature([AlchemyStoreEffects])
  ]
})
export class AlchemyStoreModule { }