import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistAccountComponent } from './artist-account.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { EarningsComponent } from './earnings/earnings.component';
import { InviteComponent } from './invite/invite.component';
import { QuantityComponent } from './quantity/quantity.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'


const routes: Routes = [
  {
    path: '',
    component:ArtistAccountComponent,
    children:[
      {
        path:'upgrade',
        component: UpgradeComponent
      },
      {
        path:'analytics',
        component: AnalyticsComponent
      },
      {
        path:'earnings',
        component: EarningsComponent
      },
      {
        path:'invite',
        component: InviteComponent
      },
      {
        path:'quantity',
        component: QuantityComponent
      },
      {
        path:'payment-details',
        component: PaymentDetailsComponent
      },
    ]
  },
]
@NgModule({
  declarations: [
    ArtistAccountComponent,
     AnalyticsComponent, 
     UpgradeComponent, 
     EarningsComponent, 
     InviteComponent, 
     QuantityComponent, 
     PaymentDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ArtstAccountModule { }
