import { ModelTopMenuItem } from './../models/menu.item.model';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';


type TViewMode = 'view' | 'edit';
interface IData {
  name: string;
  route: string;
  isShow: boolean;
}
type Writeable<T> = { -readonly [P in keyof T]: T[P] };

@Component({
  selector: 'app-menu-item-form',
  templateUrl: './menu-item-form.component.html',
  styleUrls: ['./menu-item-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('itemAnimation', [
      transition('void => *', [
        animate(1000, keyframes([
          style({ opacity: 0, transform: 'translateY(-3px)', offset: 0 }),
          style({ opacity: 0.3, transform: 'translateY(3px)', offset: 0.3 }),
          style({ opacity: 0.8, transform: 'translateY(0)', offset: 0.8 })
        ]))
      ])
    ])
  ],
})
export class MenuItemFormComponent implements OnInit {
  private _node: Writeable<ModelTopMenuItem>;
  /**
   * id for checkbox label.
   */
  labelId = UUID.UUID();
  viewMode: TViewMode;
  form: FormGroup;
  @Input() set node(n: ModelTopMenuItem) {
    this._node = n;
    this.viewMode = n.viewMode;
  }
  get node(): ModelTopMenuItem {
    return this._node;
  }
  @Input() isSelected = false;
  @Input() allowEdit = true;

  preEditName = '';
  preEditRoute = '';
  preEditIsShow: boolean;
  @Output() eventEditSubmit = new EventEmitter();
  constructor(
    private _fb: FormBuilder,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      name: [this._node.name],
      route: [this._node.route],
      isShow: [true]
    });
  }
  save(): void {
    this._node.viewMode = 'view';
    this.eventEditSubmit.emit({
      id: this.node.id,
      name: this.name.value,
      route: this.route.value,
      isShow: this.isShow.value
    });
    this.form.markAsPristine();
    this._cd.detectChanges();
  }
  edit(): void {
    this.preEditName = this.name.value;
    this.preEditRoute = this.route.value;
    this.preEditIsShow = this.isShow.value;
    this._node.viewMode = 'edit';
  }
  cancel(): void {
    this._node.viewMode = 'view';
    this.form.patchValue({
      name: this.preEditName,
      route: this.preEditRoute,
      isShow: this.preEditIsShow,
    });
    this.preEditName = '';
    this.preEditRoute = '';
    this.preEditIsShow = false;
    this.form.markAsPristine();
    this._cd.detectChanges();
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
  done(e): void {
      console.log(e);
  }
}
