import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserJoinComponent } from './user-join.component';

const routes: Routes = [
  {
    path: '',
    component: UserJoinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserJoinRoutingModule { }
