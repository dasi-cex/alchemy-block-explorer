import { createReducer, on } from '@ngrx/store';
import { BlockApiActions, fetchBlockData, fetchRecentBlockNumbers } from './alchemy.actions';

export const initialState = {
  fetchingBlockData: false
};

export const alchemyReducer = createReducer(
  initialState,
  on(fetchBlockData, (state, {blockNumber}) => {return {...state, fetchingBlockData: true}}),
  on(fetchRecentBlockNumbers, (state) => {return {...state, fetchingBlockData: true}}),
  on(BlockApiActions.retrievedBlockData, (state) => {return {...state, fetchingBlockData: false}}),
  on(BlockApiActions.retrievedRecentBlockNumbers, (state) => {return {...state, fetchingBlockData: false}}),
)