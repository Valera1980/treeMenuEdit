import { ModelTopMenuItem } from './../../models/menu.item.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuHttpFakeService {

  constructor() { }

  queryFakeMenu(): Observable<ReadonlyArray<ModelTopMenuItem>> {
    const menu = [
      new ModelTopMenuItem({
        id: 1,
        name: 'Parent one',
        route: '/parent-one',
        items: [
          new ModelTopMenuItem({ id: 2, name: 'item one', items: [], route: '/one' }),
          new ModelTopMenuItem({ id: 3, name: 'item two', items: [], route: '/two' }),
          new ModelTopMenuItem({ id: 4, name: 'item three', items: [], route: '/three' }),
        ]
      }),
      new ModelTopMenuItem({
        id: 5,
        name: 'Parent one',
        route: '/parent-one',
        items: [
          new ModelTopMenuItem({ id: 6, name: 'item six', items: [], route: 'six' }),
          new ModelTopMenuItem({ id: 7, name: 'item seven', items: [], route: 'seven' }),
          new ModelTopMenuItem({ id: 7, name: 'item eight', items: [], route: 'eight' }),
        ]
      }),
    ];
    return of(menu);
  }
  /**
   * transform tree menu to flat one-level array of menu items
   */
  flatMenu(menuItems: ModelTopMenuItem[]): ModelTopMenuItem[] {
    const arr = [];
    for (const item of menuItems) {
      const flatItem = new ModelTopMenuItem({
        id: item.id,
        items: [],
        name: item.name,
        route: item.route
      });
      arr.push(item);
      if (item.isNode()) {
        for (const childItem of item.items) {
          const flatItemChild = new ModelTopMenuItem({
            id: childItem.id,
            items: [],
            name: childItem.name,
            route: childItem.route
          });
          arr.push(flatItemChild);
        }
      }
    }
    return arr;
  }
  findNode(id: number, tree: ModelTopMenuItem[]): ModelTopMenuItem | undefined {
    let findItem;
    function _findLocaL(findId: number, arr: ModelTopMenuItem[]): void {
      if (findItem) {
        return;
      }
      for (const item of arr) {
        if (item.id === findId) {
          console.log('??????????????????? ', item);
          findItem = item;
          break;
        } else {
          _findLocaL(id, item.children);
        }
      }
    }
    _findLocaL(id, tree);
    return findItem;

  }
}
