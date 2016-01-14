import {Http, Headers} from 'angular2/http'
import {Store} from '@ngrx/store'
import {Injectable} from 'angular2/core'
import 'rxjs/Rx'

//-------------------------------------------------------------------
// ITEMS STORE
//-------------------------------------------------------------------
export const items = (state = [], {type, payload}) => {
  switch(type){
    case 'ADD_ITEMS':
      return payload;
    case 'CREATE_ITEM':
      return [...state, payload];
    case 'UPDATE_ITEM':
      let index = state.findIndex((i) => i.id === payload.id);
      return [
        ...state.slice(0, index),
        payload,
        ...state.slice(index + 1)
      ];
    case 'DELETE_ITEM':
      let index = state.findIndex((i) => i.id === payload.id);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
}

//-------------------------------------------------------------------
// SELECTED ITEM STORE
//-------------------------------------------------------------------
export const selectedItem = (state = null, {type, payload}) => {
  switch(type){
    case 'SELECT_ITEM':
      return payload;
    default:
      return state;
  }
}

//-------------------------------------------------------------------
// ITEMS SERVICE
//-------------------------------------------------------------------
@Injectable()
export class ItemsService {
  const BASE_URL = 'http://localhost:3000/items/';
  const HEADER = { headers: new Headers({ 'Content-Type': 'application/json'})};

  constructor(private http:Http, private store:Store){
    this.items = store.select('items');
  }

  loadItems() {
    this.http.get(BASE_URL)
      .map(res => res.json())
      .map(payload => ({type: 'ADD_ITEMS', payload}))
      .subscribe(action => this.store.dispatch(action));
  }

  saveItem(item) {
    (item.id) ? this.updateItem(item) : this.createItem(item);
  }

  createItem(item) {
    this.http.post(`${BASE_URL}`, JSON.stringify(item), HEADER)
      .subscribe(action => this.store.dispatch({type: 'CREATE_ITEM', payload: item}));
  }

  updateItem(item) {
    this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
      .subscribe(action => this.store.dispatch({type: 'UPDATE_ITEM', payload: item}));
  }

  deleteItem(item) {
    this.http.delete(`${BASE_URL}${item.id}`)
      .subscribe(action => this.store.dispatch({type: 'DELETE_ITEM', payload: item}));
  }
}
