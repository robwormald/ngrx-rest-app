import {Injectable} from 'angular2/core';

@Injectable()
export class WidgetsService {
  widgets = [
    {id: 1, name: 'Widget 01', price: 100},
    {id: 2, name: 'Widget 02', price: 200},
    {id: 3, name: 'Widget 03', price: 300},
    {id: 4, name: 'Widget 04', price: 400}
  ];
}
