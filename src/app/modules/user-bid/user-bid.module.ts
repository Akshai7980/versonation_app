import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserBidRoutingModule } from './user-bid-routing.module';
import { UserBidComponent } from './user-bid.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [UserBidComponent],
  imports: [
    CommonModule,
    UserBidRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class UserBidModule { }
