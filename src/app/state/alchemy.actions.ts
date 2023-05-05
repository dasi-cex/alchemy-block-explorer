import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Block } from 'alchemy-sdk';

// export const BlockActions = createActionGroup({
//   source: 'Block Details Component',
//   events: {
//     'Fetch Block Data': props<{ blockNumber: string }>(),
//     'Fetch Recent Block Numbers': emptyProps(),
//   },
// });

export const fetchBlockData = createAction(
  '[Block Details Component] Fetch Block Data',
  props<{ blockNumber: string }>()
);

export const fetchRecentBlockNumbers = createAction(
  '[Dashboard Component] Fetch Recent Block Numbers'
);

export const BlockApiActions = createActionGroup({
  source: 'Alchemy API',
  events: {
    'Retrieved Block Data': props<{ blockData: Block }>(),
    'Retrieved Recent Block Numbers': props<{ recentBlockNumbers: string[] }>(),
  },
});