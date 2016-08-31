import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: require('./app.html')
})
export class App {
  links = {
    items: ['/items'],
    widgets: ['/widgets']
  }
}
