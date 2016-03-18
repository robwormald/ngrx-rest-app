import {Http, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Widget} from "../models/widget.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const BASE_URL = 'http://localhost:3000/widgets/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class WidgetsService {
  widgets: Widget[] = [];

  constructor(private http: Http) {}

  loadWidgets() {
    return this.http.get(BASE_URL)
      .map(res => res.json())
      .toPromise();
  }
}
