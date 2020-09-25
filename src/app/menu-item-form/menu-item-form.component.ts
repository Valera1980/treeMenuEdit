import { ModelTopMenuItem } from './../models/menu.item.model';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { UUID } from 'angular2-uuid';


type TViewMode = 'view' | 'edit';
interface IData {
  name: string;
  route: string;
  isShow: boolean;
}

@Component({
  selector: 'app-menu-item-form',
  templateUrl: './menu-item-form.component.html',
  styleUrls: ['./menu-item-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemFormComponent implements OnInit {
  labelId = UUID.UUID();
  viewMode: TViewMode = 'view';
  form: FormGroup;
  private _node: ModelTopMenuItem;
  @Input() set node(n: ModelTopMenuItem) {
    this._node = n;
    console.log(this._node);
  }
  get node(): ModelTopMenuItem {
    return this._node;
  }
  @Input() isSelected = false;
  @Output() eventEdit = new EventEmitter();
  @Output() eventSelect = new EventEmitter();
  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      name: [this._node.name],
      route: [this._node.route],
      isShow: [true]
    });
  }
  save(): void {
    this.viewMode = 'view';
    this.eventEdit.emit({
      id: this.node.id,
      name: this.name.value,
      route: this.route.value,
      isShow: this.isShow.value
    });
  }
  edit(): void {
    this.viewMode = 'edit';
  }
  select(): void {
    this.eventSelect.emit({ viewMode: this.viewMode, node: this.node.clone()});
  }
  get name(): AbstractControl {
    return this.form.get('name');
  }
  get route(): AbstractControl {
    return this.form.get('route');
  }
  get isShow(): AbstractControl {
    return this.form.get('isShow');
  }

}
