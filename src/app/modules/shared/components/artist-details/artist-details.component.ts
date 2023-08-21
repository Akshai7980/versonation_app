import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {
  artistId: string = '';
  artistSongs: any = [];
  artistDetails: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fbService: FirebaseApiService,
    private loaderService: LoaderService

  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.artistId = params['artistId'];
      this.loaderService.show();
      this.getArtistDetails();
    });
  }

  getArtistDetails() {
    this.fbService.getArtistById(this.artistId)
    .subscribe((querySnapshot: any) => {
      this.getSongs();
      const artist = querySnapshot.docs.map((doc: any) => {
        const data: any = doc.data();
        return {
          id: doc.id,
          ...data
        };
      });
      this.artistDetails = artist[0];
    });
  }

  getSongs() {
    this.fbService
      .getSongs(this.artistId)
      .subscribe((querySnapshot: any) => {
        this.artistSongs = querySnapshot.docs.map((doc: any) => {
          const data: any = doc.data();
          return {
            id: doc.id,
            // name: data.name ? data.name : '',
            // Image: data?.Image ? data.Image : '',
            // show: data.show ? data.show : '',
            ...data
          };
        });
        this.loaderService.hide()
      });
  }
}
