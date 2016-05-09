import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Items} from './items/items.component';
import {Widgets} from './widgets/widgets.component';
import {Devtools} from '@ngrx/devtools';

@Component({
  selector: 'my-app',
  template: require('./app.html'),
  directives: [ROUTER_DIRECTIVES, Devtools]
})
@Routes([
  {path: '/items', component: Items},
  {path: '/widgets', component: Widgets}
])
export class App {
  links = {
    items: ['Items'],
    widgets: ['Widgets']
  }
}
