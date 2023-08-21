import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-artist-list-tile',
  templateUrl: './artist-list-tile.component.html',
  styleUrls: ['./artist-list-tile.component.scss']
})
export class ArtistListTileComponent implements OnInit {
  topArtists: any = [];
  nextCount: number = 8;
  prevCount: number = 0;

  constructor(
    private fbService: FirebaseApiService,
    private loaderService: LoaderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getTopArtist();
  }

  getTopArtist() {
    this.fbService.getArtists().subscribe((querySnapshot: any) => {
      const allTopArtists = querySnapshot.docs?.map((doc: any) => {
        const data: any = doc.data();
        return {
          id: doc.id,
          Image: doc.Image ? doc.Image : '',
          name: doc.name ? doc.name : '',
          followersCount: doc.followersCount ? doc.followersCount : '',
          ...data
        };
      });
      this.topArtists = this.topArtists.concat(allTopArtists);
      // console.log('topArtists:', this.topArtists);
    });
  }

  onClickPrev() {
    if (this.prevCount > 0) {
      this.prevCount = 0;
      this.nextCount = this.nextCount - 8;
    }
  }

  onClickNext() {
    if (this.topArtists.length > this.nextCount) {
      this.prevCount = 8;
      this.nextCount = this.nextCount + 8;
    }
  }

  onClickArtist(artist: any) {
    console.log('artist:', artist);
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       artistDetails: artist
  //     }
  // };
    this.router.navigate(['/streaming/artistDetails'], {queryParams: {artistId: artist.id}});
  }
}
