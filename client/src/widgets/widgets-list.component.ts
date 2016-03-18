import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Widget} from './../common/models/widget.model.ts';

@Component({
    selector: 'widgets-list',
    template: `
    <div *ngFor="#widget of widgets"
      class="fem-card mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">{{widget.name}}</h2>
      </div>
      <div class="mdl-card__supporting-text">
        {{widget.price}}
      </div>
    </div>
    `
})
export class WidgetsList {
  widgets: Widget[] = [];
}
