import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-trending-albums',
  templateUrl: './trending-albums.component.html',
  styleUrls: ['./trending-albums.component.scss']
})
export class TrendingAlbumsComponent implements OnInit {
  albums: any = [];

  constructor(
    private fbService: FirebaseApiService,
    private loaderService: LoaderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchAlbums();
  }

  async fetchAlbums() {
    this.loaderService.show();
    this.fbService.getAlbums().subscribe(async (querySnapshot: any) => {
      this.loaderService.hide();

      const allAlbums = querySnapshot.docs.map((doc: any) => {
        const data: any = doc.data();
        return {
          id: doc.id,
          albumName: data.albumName ? data.albumName : '',
          artists: data.artists ? data.artists : '',
          image: data?.image
            ? data.image
            : '../../../assets/images/streaming/album-02.png',
          ...data
        };
      });
      this.albums = this.albums.concat(allAlbums);
      // console.log('albums:', this.albums);
    });
  }

  onClickArtist(album: any) {
  //   console.log('album:', album);
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       albumDetails: album
  //     }
  // };
    this.router.navigate(['/streaming/albumDetails'], {queryParams: {albumId: album.id}});
  }
}
