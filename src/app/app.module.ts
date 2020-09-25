import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TreeModule } from 'primeng/tree';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { MenuItemFormComponent } from './menu-item-form/menu-item-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuEditComponent,
    MenuItemFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
