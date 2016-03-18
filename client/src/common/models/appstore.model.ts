import {Item} from './item.model';
import {Widget} from "./widget.model";

export interface AppStore {
  items: Item[];
  selectedItem: Item;
  widgets: Widget[];
  selectedWidget: Widget;
};
