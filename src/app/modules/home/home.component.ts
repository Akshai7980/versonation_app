import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private loginService: LoginService) {}
  isGuest = true;

  ngOnInit(): void {
    this.isGuest = this.loginService.isGuest();
  }
}
