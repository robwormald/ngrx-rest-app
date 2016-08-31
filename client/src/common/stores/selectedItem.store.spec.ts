import {selectedItem} from './selectedItem.store';

describe('`selectedItem` store', () => {
  it('returns null by default', () => {
    let defaultState = selectedItem(undefined, {type: 'random', payload: {}});

    expect(defaultState).toBeNull();
  });

  it('`SELECT_ITEM` returns the provided payload', () => {
    let selectItem = selectedItem(undefined, {type: 'SELECT_ITEM', payload: 'payload'});

    expect(selectItem).toBe('payload');
  });
});
