import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';
import { CreatePlaylistComponent } from '../../modal/create-playlist/create-playlist.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playLists: any = [];
  uid: string = '';
  nextCount: number = 7;
  prevCount: number = 0;

  constructor(
    private fbService: FirebaseApiService,
    private loaderService: LoaderService,
    private loginService: LoginService,
    public dialog: MatDialog,
    private router: Router,
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

  openCreatePlaylist() {
    let dialogRef = this.dialog.open(CreatePlaylistComponent, {
      width: '900px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.fetchPlaylists(this.uid);
      }
    });
  }

  onClickPrev() {
    if (this.prevCount > 0) {
      this.prevCount = 0;
      this.nextCount = this.nextCount - 7;
    }
  }

  onClickNext() {
    if (this.playLists.length > this.nextCount) {
      this.prevCount = 7;
      this.nextCount = this.nextCount + 7;
    }
  }

  onClickArtist(playlist: any) {
    // console.log('playlist:', playlist);
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       playlistDetails: playlist
  //     }
  // };
    this.router.navigate(['/streaming/playlistDetails'], {queryParams: {playlistId: playlist.id}});
  }
}
