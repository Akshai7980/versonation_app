import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent implements OnInit {

  earningForm! : FormGroup;

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.earningForm = this._fb.group({
      income: [''],
      withdrawn: [''],
      availableForWithdraw:[''],
      paid: [''],
      withdrawType: ['']
    })
  }

  onSubmit(): void {
    
  }

}
