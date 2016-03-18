import 'core-js';
import 'zone.js/dist/zone-microtask';
import 'rxjs/Rx';
import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {instrumentStore} from '@ngrx/devtools'

import {
  ROUTER_PROVIDERS,
  Location,
  LocationStrategy,
  HashLocationStrategy} from 'angular2/router';

import {provideStore} from '@ngrx/store';
import {App} from './src/app';
import {ItemsService} from './src/common/services/items.service';
import {items} from './src/common/stores/items.store';
import {selectedItem} from './src/common/stores/selectedItem.store';

bootstrap(App, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  ItemsService,
  provideStore({items, selectedItem}),
  instrumentStore()
]);
