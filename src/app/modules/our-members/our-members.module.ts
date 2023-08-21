import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurMembersRoutingModule } from './our-members-routing.module';
import { OurMembersComponent } from './our-members.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OurMembersComponent
  ],
  imports: [
    CommonModule,
    OurMembersRoutingModule,
    SharedModule
  ]
})
export class OurMembersModule { }
