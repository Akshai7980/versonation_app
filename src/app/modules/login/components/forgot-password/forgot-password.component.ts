import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  hide = true;
  isSignin=false;

  forgotPassForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    this.forgotPassForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      )
    });
  }

  ngOnInit(): void {}

  forgotPassword() {
    if (this.forgotPassForm.valid) {
      this.loginService.forgotPassword(
        this.forgotPassForm.controls['email'].value
      );
      this.snackbarService.showMessage(
        'A password reset email is sent. Please check registered email'
      );
    } else {
      this.snackbarService.showMessage('Please enter your email');
    }
  }
}
