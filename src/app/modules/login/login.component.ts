import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSignin = true;
  status = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  toggleSideBar() {
    this.status = !this.status;
  }

  loginAsGuest() {
    this.loginService.loginAsGuest();
  }
}
