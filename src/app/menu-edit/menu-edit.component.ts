import { UUID } from 'angular2-uuid';
import { ModelTopMenuItem } from './../models/menu.item.model';
import { MenuHttpFakeService } from './../services/menu-http-fake/menu-http-fake.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ConfirmationService, MenuItem, TreeNode } from 'primeng/api';

type Writeable<T> = { -readonly [P in keyof T]: T[P] };


@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuEditComponent implements OnInit {

  menuData: ModelTopMenuItem[];
  selected: any;
  selectedParent: any;
  // selectedViewMode;
  items: MenuItem[];

  constructor(
    private _menuHttp: MenuHttpFakeService,
    private _cd: ChangeDetectorRef,
    private _confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {

    this.items = this.getMenuItems();

    this._menuHttp.queryFakeMenu()
      .subscribe(m => {
        this.menuData = m.map(menuItem => menuItem as Writeable<ModelTopMenuItem>);
        this._cd.detectChanges();
      });
  }
  addMenuItem(): void {
    const newItem = new ModelTopMenuItem({ id: UUID.UUID(), isNew: true, viewMode: 'edit' });
    this.selected.children.push(newItem);
    this.selected.expanded = true;
    this.selected = newItem;
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
    this._confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        // Actual logic to perform a confirmation
      }
    });
  }
  onNodeSelect({ node, originalEvent }): void {
    if (this.selected?.viewMode === 'edit') {
      return;
    }
    this.selected = node;
    this.selectedParent = node.parent;
    // this.selectedViewMode = node.viewMode;
    this.items = this.getMenuItems();
    console.log(node);
  }
  getMenuItems(): MenuItem[] {
    return [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        // if no parent and if there is at least one selected item
        disabled: this.selectedParent !== undefined || this.selected === undefined,
        command: (e) => {
          this.addMenuItem();
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (e) => {
          this.deleteNode();
        }
      }
    ];
  }
}
