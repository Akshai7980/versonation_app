import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit {
  playLists: any = [];
  uid: string = '';
  topSongs: any = [];

  constructor(
    private fbService: FirebaseApiService,
    private loaderService: LoaderService,
    private loginService: LoginService,
    private sharedService: SharedService
    ) { }

  ngOnInit(): void {
    this.loginService.getCurrentUserDetails().then(async (user: any) => {
      this.uid = user.uid;
      // if (this.uid) {
      //   this.fetchPlaylists(this.uid);
      // }
    });
    this.fetchTopSongs();
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

  fetchTopSongs() {
    this.loaderService.show();
    this.fbService.getTopSongs()
    .pipe(first())
    .subscribe((data: any) => {
      this.topSongs = data
      this.loaderService.hide()
    });
  }

  playSong(song: any) {
    const data = {
      title: song.name,
      cover: song.popularListimage,
      music: song.music
    }
    this.sharedService.musicData = data;
  }

}
