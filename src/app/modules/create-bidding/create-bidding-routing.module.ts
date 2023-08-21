import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBiddingComponent } from './create-bidding.component';

const routes: Routes = [
  {
    path: '',
    component: CreateBiddingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateBiddingRoutingModule { }
