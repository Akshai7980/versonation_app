import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBiddingRoutingModule } from './create-bidding-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateBiddingComponent } from './create-bidding.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [CreateBiddingComponent],
  imports: [
    CommonModule,
    CreateBiddingRoutingModule,
    SharedModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCheckboxModule
  ]
})
export class CreateBiddingModule { }
