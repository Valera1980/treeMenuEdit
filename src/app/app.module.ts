import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TreeModule } from 'primeng/tree';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeDragDropService } from 'primeng/api';

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
    ReactiveFormsModule,
    MenubarModule,
    ButtonModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    CheckboxModule
  ],
  providers: [
    ConfirmationService,
    TreeDragDropService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
