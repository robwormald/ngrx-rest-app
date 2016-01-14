//our root app component
import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from 'angular2/core'
import {ItemsService} from './items'
import {Store} from '@ngrx/store'

//-------------------------------------------------------------------
// ITEMS-LIST
//-------------------------------------------------------------------
@Component({
  selector: 'items-list',
  template: `
    <div class="item" *ngFor="#item of items" (click)="selected.emit(item)">
      <button type="button" class="close" (click)="deleted.emit(item)">&times;</button>
      <h3>{{item.name}}</h3>
      <p><strong>{{item.description}}</strong></p>
    </div>
  `
})
class ItemList {
  @Input() items: any[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}

//-------------------------------------------------------------------
// ITEM DETAIL
//-------------------------------------------------------------------
@Component({
  selector: 'item-detail',
  template: `
  <div class="col-sm-8">
    <h3 *ngIf="item.id">Editing {{item.name}}</h3>
    <h3 *ngIf="!item.id">Create New Item</h3>
    <hr/>
    <form class="create-form" role="form" novalidate>
        <div class="form-group">
            <label>Item Name</label>
            <input type="text" class="form-control"
                [(ngModel)]="item.name" placeholder="Enter name">
        </div>
        <div class="form-group">
            <label>Item Description</label>
            <input type="text" class="form-control"
                [(ngModel)]="item.description" placeholder="Enter description">
        </div>
        <button type="submit" class="btn btn-info btn-lg" (click)="saved.emit(item)">Save</button>
        <button type="button" class="btn btn-default btn-lg pull-right" (click)="cancelled.emit(item)">Cancel</button>
    </form>
  </div>
  `
})
class ItemDetail {
  @Input() item: any[]
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
    <div class="col-sm-4">
      <div class="portal col">
        <items-list [items]="items | async"
          (selected)="selectItem($event)" (deleted)="deleteItem($event)"></items-list>
      </div>
    </div>

    <div class="col-sm-8">
      <item-detail
        (saved)="saveItem($event)" (cancelled)="resetItem($event)"
        [item]="selectedItem | async">Select an Item</item-detail>
    </div>
  `,
  directives: [ItemList, ItemDetail],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  constructor(private itemsService:ItemsService, private store:Store) {
    this.items = itemsService.items;
    this.selectedItem = store.select('selectedItem').filter(id => (id));

    this.selectedItem.subscribe(v => console.log(v));
    this.items.subscribe(v => this.resetItem());

    itemsService.loadItems();
  }

  resetItem() {
    let emptyItem = {id: null, name:'', description:''};

    console.log('HELLO WEEEEEEE!');

    this.store.dispatch({type: 'SELECT_ITEM', payload: emptyItem});
  }

  selectItem(item) {
    this.store.dispatch({type: 'SELECT_ITEM', payload: item});
  }

  saveItem(item) {
    this.itemsService.saveItem(item);
  }

  deleteItem(item) {
    this.itemsService.deleteItem(item);
  }
}
