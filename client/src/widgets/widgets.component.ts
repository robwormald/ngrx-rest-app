import {Component} from 'angular2/core'
import {WidgetsService} from './../common/services/widgets.service.ts';
import {WidgetsList} from './widgets-list.component';
import {WidgetDetails} from './widget-details.component';

@Component({
  selector: 'widgets',
  template: `
    <h4>Fix my inputs and outputs!</h4>
    <div class="mdl-grid items">
      <div class="mdl-cell mdl-cell--6-col">
        <widgets-list [widgets]="widgets"
        (selected)="selectWidget($event)"></widgets-list>
      </div>
      <div class="mdl-cell mdl-cell--6-col">
        <widget-details (saved)="saveWidget($event)" [widget]="selectedWidget"></widget-details>
      </div>
    </div>
  `,
  styles: [`
    .widgets {
      padding: 20px;
    }
  `],
  directives: [WidgetsList, WidgetDetails],
  providers: [WidgetsService]
})
export class Widgets {
  widgets = [];
  selectedWidget = {};

  constructor(_widgetsService: WidgetsService) {
    _widgetsService.loadWidgets()
      .then(widgets => this.widgets = widgets);
  }

  selectWidget(widget) {
    this.selectedWidget = widget;
  }

  saveWidget(widget) {
    console.log('widget', widget);
  }
}
