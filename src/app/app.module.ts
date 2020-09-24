import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TreeModule } from 'primeng/tree';
import { MenuEditComponent } from './menu-edit/menu-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
