import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-trending-songs',
  templateUrl: './trending-songs.component.html',
  styleUrls: ['./trending-songs.component.scss']
})
export class TrendingSongsComponent implements OnInit {
  songs: any = [];
  @Output() openMusicPannel = new EventEmitter<{show: boolean, music: string, title: string, cover: string}>();

  constructor(
    private fbService: FirebaseApiService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.fetchSongs();
  }

  async fetchSongs() {
    this.loaderService.show();
    this.fbService.getSongs().subscribe(async (querySnapshot: any) => {
      this.loaderService.hide();

      const allSongs = querySnapshot.docs.map((doc: any) => {
        const data: any = doc.data();
        return {
          id: doc.id,
          albumName: data.albumName ? data.albumName : '',
          artists: data.artists ? data.artists : '',
          image: data?.popularListimage ? data.popularListimage : '',
          music: data?.music ? data.music : '',
          musicType: data?.musicType ? data.musicType : '',
          name: data?.name ? data.name : '',
          type: data?.type ? data.type : '',
          ...data
        };
      });
      this.songs = this.songs.concat(allSongs);
      // console.log('songs:', this.songs);
    });
  }

  getItem(ev: any): void {
    this.openMusicPannel.emit({show: true, music: ev?.music, title: ev?.name, cover: ev?.popularListimage})
  }
}
