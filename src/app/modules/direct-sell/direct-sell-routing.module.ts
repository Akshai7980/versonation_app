import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectSellComponent } from './direct-sell.component';

const routes: Routes = [
  {
    path: '',
    component: DirectSellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectSellRoutingModule { }
