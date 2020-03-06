import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleMasterComponent } from './title-master/title-master.component';

import { AgGridModule } from 'ag-grid-angular';
import { GridComponent } from './grid/grid.component'

@NgModule({
  declarations: [
    AppComponent,
    TitleMasterComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents(null)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
