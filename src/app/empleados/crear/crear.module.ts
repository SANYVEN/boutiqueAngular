import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CrearRoutingModule } from './crear-routing.module';
import { CrearComponent } from './crear.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearComponent
  ],
  imports: [
    CommonModule,
    CrearRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class CrearModule { }
