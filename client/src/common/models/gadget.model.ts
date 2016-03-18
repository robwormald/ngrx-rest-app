import {Item} from './item.model';
import {Widget} from './widget.model';

export interface Gadget {
  items: Item[];
  widgets: Widget[];
};
