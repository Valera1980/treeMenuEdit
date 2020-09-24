import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
