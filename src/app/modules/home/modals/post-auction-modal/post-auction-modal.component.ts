import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-auction-modal',
  templateUrl: './post-auction-modal.component.html',
  styleUrls: ['./post-auction-modal.component.scss']
})
export class PostAuctionModalComponent implements OnInit {

  auctionForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<PostAuctionModalComponent>
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.auctionForm = this._fb.group({
      title: ['', [Validators.required]],
      sub_title: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      time: ['', [Validators.required]],
      file: ['', [Validators.required]],
      demo_file: ['', [Validators.required]]
    })
  }

  submit(): void {
    if (this.auctionForm.invalid) {
      this.auctionForm.markAllAsTouched();
      return;
    }
  }

  close(): void {
    this._dialogRef.close();
  }

}
