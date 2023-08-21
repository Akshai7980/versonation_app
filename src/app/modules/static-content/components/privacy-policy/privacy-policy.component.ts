import { Component, OnInit } from '@angular/core';
import { PRIVACY_POLICY } from 'src/app/constants/privacy-policy';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  privacy_policy = PRIVACY_POLICY

  constructor() { }

  ngOnInit(): void {
  }

}
