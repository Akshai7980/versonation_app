import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      total_earnings: [''],
      account_status: [''],
      ongoung: [''],
      soldout: [''],
      upcoming: [''],
      live: [''],
      closed: [''],
      indirect_selling: [''],
      in_bidding_rooms: [''],
      followers: [''],
      following: ['']
    })
  }

}
