import { createReducer, on } from '@ngrx/store';

import { BlockActions, BlockApiActions } from './alchemy.actions';
import { Block } from 'alchemy-sdk';

export const initialState = {
  fetchingBlockData: false
};

export const alchemyReducer = createReducer(
  initialState,
  on(BlockActions.fetchBlockData, (state, {blockNumber}) => {return {...state, fetchingBlockData: true}}),
  on(BlockApiActions.retrievedBlockData, (state) => {return {...state, fetchingBlockData: false}})
)