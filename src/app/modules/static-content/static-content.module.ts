import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StaticContentRoutingModule } from './static-content-routing.module';
import { StaticContentComponent } from './static-content.component';
import { AboutComponent } from './components/about/about.component';
import { HelpComponent } from './components/help/help.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';

@NgModule({
  declarations: [
    StaticContentComponent,
    AboutComponent,
    HelpComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent
  ],
  imports: [
    CommonModule,
    StaticContentRoutingModule,
    CommonModule, 
    MatIconModule,
    MatButtonModule,
    MatExpansionModule
  ]
})
export class StaticContentModule { }
