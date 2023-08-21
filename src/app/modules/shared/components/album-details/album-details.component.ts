import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {
  albumDetails: any = {};
  albumId: string = '';
  songsList: any = [];

  constructor(
    private readonly route: ActivatedRoute,
    private fbService: FirebaseApiService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.albumId = params['albumId'];
      this.loaderService.show();
      this.getAlbumDetails();
    });
  }

  getAlbumDetails() {
    this.fbService.getAlbumById(this.albumId)
    .subscribe((querySnapshot: any) => {
      this.getSongs();
      const album = querySnapshot.docs.map((doc: any) => {
        const data: any = doc.data();
        return {
          id: doc.id,
          ...data
        };
      });
      this.albumDetails = album[0];
    });
  }

  getSongs() {
    this.fbService
      .getAlbumSongs(this.albumId)
      .subscribe((querySnapshot: any) => {
        this.songsList = querySnapshot.docs.map((doc: any) => {
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
