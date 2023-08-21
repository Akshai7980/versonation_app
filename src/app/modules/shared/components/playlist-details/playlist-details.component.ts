import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnInit {
  playListDetails: any = {};
  playlistId: string = '';
  uid: string = '';
  songsList: any = [];

  constructor(
    private readonly route: ActivatedRoute,
    private fbService: FirebaseApiService,
    private loaderService: LoaderService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.playlistId = params['playlistId'];
      this.loginService.getCurrentUserDetails().then(async (user: any) => {
        this.uid = user.uid;
        if (this.uid) {
          this.getPlaylist(this.uid);
        }
      });
    });
  }

  getPlaylist(uid: any) {
    this.loaderService.show();
    this.fbService.getCurrentPlaylist(uid, this.playlistId).subscribe(async (querySnapshot: any) => {
      const playListDetails = querySnapshot.docs.map((doc: any) => {
        const data = doc.data();
        return { id: doc.id, ...data }
      });
      this.playListDetails = playListDetails[0];
      if (this.playListDetails?.songs.length) {
        this.getSongsArray(this.playListDetails.songs)
      } else {
        this.loaderService.hide();
      }
    });
  }

  getSongsArray(songsIds: any) {
    this.songsList = [];
    this.fbService.getMultipleSongDetails(songsIds).subscribe((data: any) => {
      this.songsList = data.docs.map((doc: any) => {
        const data = doc.data();
        return { id: doc.id, ...data }
      });
      this.loaderService.hide();
    });
  }

}
