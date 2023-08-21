import { Component, OnInit } from '@angular/core';
import { TERMS_AND_CONDITIONS } from 'src/app/constants/terms-conditions';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  terms_conditions = TERMS_AND_CONDITIONS

  constructor() { }

  ngOnInit(): void {
  }

}
