import { Component, OnInit } from '@angular/core';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-artist-details-tile',
  templateUrl: './artist-details-tile.component.html',
  styleUrls: ['./artist-details-tile.component.scss']
})
export class ArtistDetailsTileComponent implements OnInit {
  playLists: any = [];
  uid: string = '';

  constructor(
    private fbService: FirebaseApiService,
    private loaderService: LoaderService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.loginService.getCurrentUserDetails().then(async (user: any) => {
      this.uid = user.uid;
      if (this.uid) {
        this.fetchPlaylists(this.uid);
      }
    });
  }

  fetchPlaylists(uid: string) {
    this.loaderService.show();
    this.fbService.getPlaylists(uid).subscribe(async (querySnapshot: any) => {
      this.loaderService.hide();
      this.playLists = [];
      const allPlaylists = querySnapshot.docs.map((doc: any) => {
        const data: any = doc.data();
        return {
          id: doc.id,
          name: data.name ? data.name : '',
          Image: data?.Image ? data.Image : '',
          show: data.show ? data.show : '',
          ...data
        };
      });
      this.playLists = this.playLists.concat(allPlaylists);
      console.log('playLists:', this.playLists);
    });
  }
}
