import { Items } from './src/items/items.component';
import { Widgets } from './src/widgets/widgets.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '',            component: Items },
  {path: 'items',      component: Items},
  {path: 'widgets',    component: Widgets},
  {path: '*',           component: Items }
];
