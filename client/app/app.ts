//our root app component
import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from 'angular2/core'
import {ItemsService, Item} from './items'
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store'

//-------------------------------------------------------------------
// ITEMS-LIST
//-------------------------------------------------------------------
@Component({
  selector: 'items-list',
  template: `
    <div *ngFor="#item of items" (click)="selected.emit(item)"
      class="item-card mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">{{item.name}}</h2>
      </div>
      <div class="mdl-card__supporting-text">
        {{item.description}}
      </div>
      <div class="mdl-card__menu">
        <button (click)="deleted.emit(item)"
          class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">close</i>
        </button>
      </div>
    </div>
  `
})
class ItemList {
  @Input() items: Item[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}

//-------------------------------------------------------------------
// ITEM DETAIL
//-------------------------------------------------------------------
@Component({
  selector: 'item-detail',
  template: `
  <div class="item-card mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text" *ngIf="item.id">Editing {{item.name}}</h2>
      <h2 class="mdl-card__title-text" *ngIf="!item.id">Create New Item</h2>
    </div>
    <div class="mdl-card__supporting-text">
      <form novalidate>
          <div class="mdl-textfield mdl-js-textfield">
            <label>Item Name</label>
            <input [(ngModel)]="item.name"
              placeholder="Enter a name"
              class="mdl-textfield__input" type="text">
          </div>

          <div class="mdl-textfield mdl-js-textfield">
            <label>Item Description</label>
            <input [(ngModel)]="item.description"
              placeholder="Enter a description"
              class="mdl-textfield__input" type="text">
          </div>
      </form>
    </div>
    <div class="mdl-card__actions">
        <button type="submit" (click)="cancelled.emit(item)"
          class="mdl-button mdl-js-button mdl-js-ripple-effect">Cancel</button>
        <button type="submit" (click)="saved.emit(item)"
          class="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">Save</button>
    </div>
  </div>
  `
})
class ItemDetail {
  @Input() item: Item[];
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}

//-------------------------------------------------------------------
// MAIN COMPONENT
//-------------------------------------------------------------------
@Component({
  selector: 'my-app',
  providers: [],
  template: `
    <div class="mdl-cell mdl-cell--6-col">
      <items-list [items]="items | async"
        (selected)="selectItem($event)" (deleted)="deleteItem($event)">
      </items-list>
    </div>
    <div class="mdl-cell mdl-cell--6-col">
      <item-detail
        (saved)="saveItem($event)" (cancelled)="resetItem($event)"
        [item]="selectedItem | async">Select an Item</item-detail>
    </div>
  `,
  directives: [ItemList, ItemDetail],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  items: Observable<Array<Item>>;
  selectedItem: Observable<Item>;

  constructor(private itemsService:ItemsService, private store: Store<Item>) {
    this.items = itemsService.items;
    this.selectedItem = store.select('selectedItem').filter(id => (id));

    this.selectedItem.subscribe(v => console.log(v));
    this.items.subscribe(v => this.resetItem());

    itemsService.loadItems();
  }

  resetItem() {
    let emptyItem: Item = {id: null, name:'', description:''};
    this.store.dispatch({type: 'SELECT_ITEM', payload: emptyItem});
  }

  selectItem(item: Item) {
    this.store.dispatch({type: 'SELECT_ITEM', payload: item});
  }

  saveItem(item: Item) {
    this.itemsService.saveItem(item);
  }

  deleteItem(item: Item) {
    this.itemsService.deleteItem(item);
  }
}
