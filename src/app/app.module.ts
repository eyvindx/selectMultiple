import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MultiSelectModule} from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CalendarModule} from 'primeng/calendar';
import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ComponenteComponent } from './componente/componente.component';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ComponenteComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    FormsModule,
    HttpClientModule,
    CalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
