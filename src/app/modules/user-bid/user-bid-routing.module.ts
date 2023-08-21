import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserBidComponent } from './user-bid.component';

const routes: Routes = [
  {
    path: '',
    component: UserBidComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserBidRoutingModule { }
