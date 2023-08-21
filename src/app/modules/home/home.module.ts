import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

import { MatGridListModule } from '@angular/material/grid-list';
import { ProfileComponent } from './components/profile/profile.component';
import { LandingComponent } from './components/landing/landing.component';
import { ArtistActionComponent } from './components/artist-action/artist-action.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PostAuctionModalComponent } from './modals/post-auction-modal/post-auction-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    LandingComponent,
    ArtistActionComponent,
    PostAuctionModalComponent,
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatGridListModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule
  ]
})
export class HomeModule {}
