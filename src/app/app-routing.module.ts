import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { NonAuthGuard } from './services/non-auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
    canActivate: [NonAuthGuard]
  },
  {
    path: 'static',
    loadChildren: () =>
      import('./modules/static-content/static-content.module').then(
        (m) => m.StaticContentModule
      )
  },
  {
    path: 'streaming',
    loadChildren: () =>
      import('./modules/streaming/streaming.module').then(
        (m) => m.StreamingModule
      )
  },
  {
    path: 'userjoin',
    loadChildren: () =>
      import('./modules/user-join/user-join.module').then(
        (m) => m.UserJoinModule
      )
  },
  {
    path: 'userbid',
    loadChildren: () =>
      import('./modules/user-bid/user-bid.module').then(
        (m) => m.UserBidModule
      )
  },
  {

    path: 'our-members',
    loadChildren: () =>
      import('./modules/our-members/our-members.module').then(
        (m) => m.OurMembersModule
      )
  },
  {

    path: 'direct-sell',
    loadChildren: () =>
      import('./modules/direct-sell/direct-sell.module').then(
        (m) => m.DirectSellModule,
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'artist-account',
    loadChildren: () =>
      import('./modules/artist-account/artst-account.module').then(
        (m) => m.ArtstAccountModule,
      ),
      
  },
  {
    path: 'entrepreneurship',
    loadChildren: () =>
      import('./modules/entrepreneurship/entrepreneurship.module').then(
        (m) => m.EntrepreneurshipModule,
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'home/sale',
    loadChildren: () =>
      import('./modules/sale/sale.module').then(
        (m) => m.SaleModule,
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'create-bid',
    loadChildren: () =>
      import('./modules/create-bidding/create-bidding.module').then(
        (m) => m.CreateBiddingModule,
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'stream-upload',
    loadChildren: () =>
      import('./modules/stream-upload/stream-upload.module').then(
        (m) => m.StreamUploadModule,
      ),
      canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
