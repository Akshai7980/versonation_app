import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-new-artist-list',
  templateUrl: './new-artist-list.component.html',
  styleUrls: ['./new-artist-list.component.scss']
})
export class NewArtistListComponent implements OnInit {
  artists: any = [];

  constructor(
    private fbService: FirebaseApiService,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchArtist();
  }

  async fetchArtist() {
    this.loaderService.show();

    this.fbService.getArtists().subscribe(async (querySnapshot: any) => {
      this.loaderService.hide();

      const allArtists = querySnapshot.docs.map((doc: any) => {
        const data: any = doc.data();
        console.log(data);

        return {
          id: doc.id,
          Image: data.Image ? data.Image : '',
          followersCount: data.followersCount ? data.followersCount : '0',
          name: data.name ? data.name : '',
          show: data.show ? data.show : '',
          ...data
        };
      });

      this.artists = this.artists.concat(allArtists);
      // console.log('artists:', this.artists);
    });
  }

  onClickArtist(artist: any) {
    this.router.navigate(['/streaming/artistDetails'], {queryParams: {artistId: artist.id}});
  }
}
