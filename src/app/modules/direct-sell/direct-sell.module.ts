import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectSellRoutingModule } from './direct-sell-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DirectSellComponent } from './direct-sell.component';


@NgModule({
  declarations: [DirectSellComponent],
  imports: [
    CommonModule,
    DirectSellRoutingModule,
    SharedModule
  ]
})
export class DirectSellModule { }
