//main entry point
import {bootstrap} from 'angular2/platform/browser';
import {App} from './src/app';
import {provideStore} from '@ngrx/store';
import {ItemsService, items, selectedItem} from './src/items';
import {HTTP_PROVIDERS} from 'angular2/http';

bootstrap(App, [
  ItemsService,
  HTTP_PROVIDERS,
  provideStore({items, selectedItem})
])
.catch(err => console.error(err));
