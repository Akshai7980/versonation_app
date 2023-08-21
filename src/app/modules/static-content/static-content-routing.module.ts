import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HelpComponent } from './components/help/help.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { StaticContentComponent } from './static-content.component';

const routes: Routes = [
  {
    path: '',
    component: StaticContentComponent,
    children: [
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'help',
        component: HelpComponent
      },
      {
        path: 'privacy',
        component: PrivacyPolicyComponent
      },
      {
        path: 'terms',
        component: TermsConditionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticContentRoutingModule { }
