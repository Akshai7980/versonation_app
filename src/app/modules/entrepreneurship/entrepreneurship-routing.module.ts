import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrepreneurshipComponent } from './entrepreneurship.component';

const routes: Routes = [{ path: '', component: EntrepreneurshipComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepreneurshipRoutingModule { }
