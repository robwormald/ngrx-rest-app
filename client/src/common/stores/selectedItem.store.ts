import {Reducer, Action} from '@ngrx/store';

export const selectedItem:Reducer<any> = (state: any = null, {type, payload}: Action) => {
  switch (type) {
    case 'SELECT_ITEM':
      return payload;
    default:
      return state;
  }
};
