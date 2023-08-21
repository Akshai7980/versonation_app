import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-our-members',
  templateUrl: './our-members.component.html',
  styleUrls: ['./our-members.component.scss']
})
export class OurMembersComponent implements OnInit {
  isGuest: boolean = true;
  artists: any = [];

  constructor(private loginService: LoginService,
    private fbService: FirebaseApiService,
    ) {}

  ngOnInit(): void {
    this.isGuest = this.loginService.isGuest();
    this.getTopArtist();
  }

  getTopArtist() {
    this.fbService
      .getTopArtists()
      .pipe(first())
      .subscribe((data: any) => {
        this.artists = [...data];
      });
      console.log('artists:',this.artists);
  }
}
