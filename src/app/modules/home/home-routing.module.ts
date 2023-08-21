import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ArtistActionComponent } from './components/artist-action/artist-action.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LandingComponent
      },

      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'profile/:id',
        component: ProfileComponent
      },
      {
        path: 'auction',
        component: ArtistActionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
