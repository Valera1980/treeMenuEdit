import { UUID } from 'angular2-uuid';
import { ModelTopMenuItem } from './../models/menu.item.model';
import { MenuHttpFakeService } from './../services/menu-http-fake/menu-http-fake.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ConfirmationService, MenuItem, TreeNode } from 'primeng/api';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

type Writeable<T> = { -readonly [P in keyof T]: T[P] };


@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('nodeAnimation', [
      transition('* => void', [
        animate('2s', style({ opacity: 0, transform: 'scale(.3)' }))
      ])
    ])
  ],
})
export class MenuEditComponent implements OnInit {

  menuData: ModelTopMenuItem[];
  selected: any;
  selectedParent: any;
  // selectedViewMode;
  items: MenuItem[];

  testArr = [new ModelTopMenuItem()];

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
  addNode(): void {
    const newItem = new ModelTopMenuItem({ id: UUID.UUID(), isNew: true, viewMode: 'edit' });
    this.menuData.push(newItem);
    this.selected = newItem;
    this.selected.expanded = true;
  }
  editNode({ id, name, route, isShow }: { id: number, name: string, route: string, isShow: boolean }): void {
    this.selected.name = name;
    this.selected.route = route;
    this.selected.isShow = isShow;
    this._cd.detectChanges();
  }
  deleteNode(): void {
    if (!this.selected.isNew) {
      return;
    }
    this._confirmationService.confirm({
      message: this.getRemoveMessage(this.selected),
      accept: () => {
        console.log(this.selected);
        const parent = this.selected.parent;
        if (parent) {
          parent.children = parent.items = parent.children.filter(n => n.id !== this.selected.id);
        } else {
          this.menuData = this.menuData.filter(n => n.id !== this.selected.id);
        }
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
        label: 'Новый узел',
        icon: 'pi pi-fw pi-plus',
        command: (e) => {
          this.addNode();
        }
      },
      {
        label: 'Новый элемент',
        icon: 'pi pi-fw pi-plus',
        disabled: this.selectedParent !== undefined || this.selected === undefined,
        command: (e) => {
          this.addMenuItem();
        }
      },
      {
        label: 'Удалить',
        icon: 'pi pi-fw pi-trash',
        disabled: this.selected === undefined || !this.selected.isNew,
        command: (e) => {
          this.deleteNode();
        }
      }
    ];
  }
  getRemoveMessage(node: ModelTopMenuItem): string {
    if (node.children.length) {
      return `Удалить  узел ${node.name} и ${node.children.length} дочерних элемента ?`;
    }
    return `Удалить  узел ${node.name} ?`;
  }
}
