import {Item} from './item.model';

export interface AppStore {
  items: Item[];
  selectedItem: Item;
};