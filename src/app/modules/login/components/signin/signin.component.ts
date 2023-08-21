import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { APP_STORE_URL, PLAY_STORE_URL } from 'src/app/constants/urls';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  hide = true;
  isSignin = true;
  loginForm: FormGroup;
  forgotPassword: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });
  }

  ngOnInit() {}

  sigin() {
    if (this.loginForm.invalid) {
      console.log('invalid');
      return;
    }
    this.loginService.login(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    );
  }

  onRememberMeCheck(event: any) {
    console.log('event:', event);
    if (event.checked && this.loginForm.valid) {
      localStorage.setItem('loginData', this.loginForm.value);
      this.snackbarService.showMessage(
        'Your email address and password stored successfully!'
      );
    } else {
      this.snackbarService.showMessage(
        'Please enter your email address and password!'
      );
    }
  }

  goToForgot() {
    this.forgotPassword = !this.forgotPassword;
  }

  googleLogin() {
    this.loginService.googleAuth();
  }

  facebookLogin() {
    this.loginService.facebookAuth();
  }

  gotoStore(type: 'play_store' | 'app_store') :void {
    if(type === 'play_store'){
      window.open(PLAY_STORE_URL);
    }else{
      window.open(APP_STORE_URL);
    }
  }
}
