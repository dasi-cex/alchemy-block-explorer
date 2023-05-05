import { AlchemyStoreState } from "./alchemy-store";
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { alchemyStoreReducer } from "./alchemy-store/reducer";
import { ActionReducerMap } from "@ngrx/store";
import { StoreFeatureKeys } from "shared-models/store/feature-keys.model";

export interface AppState {
  [StoreFeatureKeys.ALCHEMY]: AlchemyStoreState.AlchemyState;
  router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<AppState> = {
  [StoreFeatureKeys.ALCHEMY]: alchemyStoreReducer,
  router: routerReducer
};