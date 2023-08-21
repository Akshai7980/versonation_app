import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrepreneurshipRoutingModule } from './entrepreneurship-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EntrepreneurshipComponent } from './entrepreneurship.component';


@NgModule({
  declarations: [
    EntrepreneurshipComponent
  ],
  imports: [
    CommonModule,
    EntrepreneurshipRoutingModule,
    SharedModule
  ]
})
export class EntrepreneurshipModule { }
