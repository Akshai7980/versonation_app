import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  bankForm!: FormGroup;
  cardForm!: FormGroup; 

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void { 
    this.bankForm = this.fb.group({
      bank: [''],
      bank_code: [''],
      account_no: [''],
      account_holder: ['']
    })

    this.cardForm = this.fb.group({
      card_no: [''],
      card_type: [''],
      exp_date: [''],
      cvc: [''],
      card_holder: ['']
    })
  }

  submit(type: 'bank' | 'card'): void {
    
  }

}
