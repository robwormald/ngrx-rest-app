import {Http, Headers} from 'angular2/http';
import {Store} from '@ngrx/store';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

//-------------------------------------------------------------------
// ITEMS STORE
//-------------------------------------------------------------------
export const items = (state: any = [], {type, payload}) => {
  let index: number;
  switch (type) {
    case 'ADD_ITEMS':
      return payload;
    case 'CREATE_ITEM':
      return [...state, payload];
    case 'UPDATE_ITEM':
      index = state.findIndex((i: Item) => i.id === payload.id);
      return [
        ...state.slice(0, index),
        payload,
        ...state.slice(index + 1)
      ];
    case 'DELETE_ITEM':
      index = state.findIndex((i: Item) => i.id === payload.id);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
};

//-------------------------------------------------------------------
// SELECTED ITEM STORE
//-------------------------------------------------------------------
export const selectedItem = (state: any = null, {type, payload}) => {
  switch (type) {
    case 'SELECT_ITEM':
      return payload;
    default:
      return state;
  }
};

//-------------------------------------------------------------------
// ITEMS SERVICE
//-------------------------------------------------------------------
const BASE_URL = 'http://localhost:3000/items/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json'})};

export interface Item {
  id: number;
  name: string;
  description: string;
};

export interface AppStore {
  items: Item[];
  selectedItem: Item;
};

@Injectable()
export class ItemsService {
  items: Observable<Array<Item>>;

  constructor(private http: Http, private store: Store<AppStore>) {
    this.items = store.select('items');
  }

  loadItems() {
    this.http.get(BASE_URL)
      .map(res => res.json())
      .map(payload => ({type: 'ADD_ITEMS', payload}))
      .subscribe(action => this.store.dispatch(action));
  }

  saveItem(item: Item) {
    (item.id) ? this.updateItem(item) : this.createItem(item);
  }

  createItem(item: Item) {
    this.http.post(`${BASE_URL}`, JSON.stringify(item), HEADER)
      .subscribe(action => this.store.dispatch({type: 'CREATE_ITEM', payload: item}));
  }

  updateItem(item: Item) {
    this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
      .subscribe(action => this.store.dispatch({type: 'UPDATE_ITEM', payload: item}));
  }

  deleteItem(item: Item) {
    this.http.delete(`${BASE_URL}${item.id}`)
      .subscribe(action => this.store.dispatch({type: 'DELETE_ITEM', payload: item}));
  }
}
