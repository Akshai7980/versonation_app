import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OurMembersComponent } from './our-members.component';

const routes: Routes = [{ path: '', component: OurMembersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurMembersRoutingModule { }
