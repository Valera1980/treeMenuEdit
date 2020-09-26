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
        name: 'Группа 1',
        route: '/parent-one',
        items: [
          new ModelTopMenuItem({ id: 2, name: 'контакты', items: [], route: '/contacts' }),
          new ModelTopMenuItem({ id: 3, name: 'о нас', items: [], route: '/about-us' }),
          new ModelTopMenuItem({ id: 4, name: 'ход строительства', items: [], route: '/calculator' }),
        ]
      }),
      new ModelTopMenuItem({
        id: 5,
        name: 'Группа два',
        route: '/parent-two',
        items: [
          new ModelTopMenuItem({ id: 6, name: 'галерея', items: [], route: 'gallery' }),
          new ModelTopMenuItem({ id: 7, name: 'подобрать квартиру', items: [], route: 'flat' }),
          new ModelTopMenuItem({ id: 8, name: 'документация', items: [], route: 'documents' }),
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
    let findItem: ModelTopMenuItem | undefined;
    function _findLocaL(findId: number, arr: ModelTopMenuItem[]): void {
      if (findItem) {
        return;
      }
      for (const item of arr) {
        if (item.id === findId) {
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
