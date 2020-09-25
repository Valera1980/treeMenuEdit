import { ModelTopMenuItem } from './../models/menu.item.model';
import { MenuHttpFakeService } from './../services/menu-http-fake/menu-http-fake.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

type Writeable<T> = { -readonly [P in keyof T]: T[P] };


@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuEditComponent implements OnInit {

  menuData: ModelTopMenuItem[];
  selected: ModelTopMenuItem;
  selectedViewMode;
  constructor(
    private _menuHttp: MenuHttpFakeService,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._menuHttp.queryFakeMenu()
      .subscribe(m => {
        this.menuData = m.map(menuItem => menuItem as Writeable<ModelTopMenuItem>);
        this._cd.detectChanges();
      });
  }
  addMenuItem(): void {

  }
  editNode({ id, name, route, isShow }: { id: number, name: string, route: string, isShow: boolean }): void {
    const node = this._menuHttp.findNode(id, this.menuData) as Writeable<ModelTopMenuItem>;
    if (!node) {
      throw new Error(`Node with id=${id} not found`);
    }
    node.name = name;
    node.route = route;
    this._cd.detectChanges();
    // node.isShow = isShow;
  }
  deleteNode(): void {

  }
  selectNode({ node, viewMode }): void {
    // prevent edit more than one node
    if (this.selectedViewMode === 'edit' && node.id !== this.selected.id) {
      return;
    }
    this.selected = node;
    this.selectedViewMode = viewMode;
    this._cd.detectChanges();
  }
}
