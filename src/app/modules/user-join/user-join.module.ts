import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserJoinRoutingModule } from './user-join-routing.module';
import { UserJoinComponent } from './user-join.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserJoinComponent
  ],
  imports: [
    CommonModule,
    UserJoinRoutingModule,
    SharedModule
  ]
})
export class UserJoinModule { }
