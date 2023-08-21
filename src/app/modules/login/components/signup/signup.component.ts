import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { STATES } from 'src/app/constants/state-list';
import { ACCOUNTTYPE } from 'src/app/constants/account-type-list';
import { GENDERTYPE } from 'src/app/constants/gender-type-list';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  hide = true;
  states = STATES;
  accountsType = ACCOUNTTYPE;
  genderType=GENDERTYPE;
  isSignin=false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.nullValidator
        ])
      ),
      lastName: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.nullValidator
        ])
      ),
      email: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      password: new FormControl(
        null,
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          ,
          Validators.nullValidator
        ])
      ),
      city: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.nullValidator
        ])
      ),
      state: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.nullValidator])
      ),
      zipCode: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.nullValidator
        ])
      ),
      accountType: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.nullValidator
        ])
      ),
      genderType: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.nullValidator
        ])
      ),
      bio: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.nullValidator
        ])
      ),
      bestDescribesYou: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.nullValidator])
      ),
      genreRange: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.nullValidator])
      )
    });
  }

  ngOnInit(): void {}

  onSelectState(event: any) {
    this.registerForm.controls['state'].setValue(event.value);
  }

  onSelectAccountType(event: any) {
    this.registerForm.controls['accountType'].setValue(event.value);
  }

  onSelectGenderType(event: any) {
    this.registerForm.controls['genderType'].setValue(event.value);
  }

  signUp() {
    if (this.registerForm.valid) {
      console.log('valid form');
      const userDetails = {
        address: '',
        bestdescription: this.registerForm.controls['bestDescribesYou'].value,
        bio: this.registerForm.controls['bio'].value,
        city: this.registerForm.controls['city'].value,
        contact: '',
        dob: '',
        email: this.registerForm.controls['email'].value,
        enableNotifications: true,
        genre: [],
        firstName: this.registerForm.controls['firstName'].value,
        lastName: this.registerForm.controls['lastName'].value,
        name: `${this.registerForm.controls['firstName'].value} ${this.registerForm.controls['lastName'].value}`,
        role: this.registerForm.controls['accountType'].value,
        gender:this.registerForm.controls['genderType'].value,
        state: this.registerForm.controls['state'].value,
        work: '',
        zip: this.registerForm.controls['zipCode'].value
      };
      this.loginService.register(
        this.registerForm.controls['email'].value,
        this.registerForm.controls['password'].value,
        userDetails
      );
    } else {
      console.log('invalid');
    }
  }
}
