import { createActionGroup, props } from '@ngrx/store';
import { Block } from 'alchemy-sdk';

export const BlockActions = createActionGroup({
  source: 'Block Details Component',
  events: {
    'Fetch Block Data': props<{ blockNumber: string }>()
  },
});

export const BlockApiActions = createActionGroup({
  source: 'Alchemy API',
  events: {
    'Retrieved Block Data': props<{ blockData: Block }>(),
  },
});