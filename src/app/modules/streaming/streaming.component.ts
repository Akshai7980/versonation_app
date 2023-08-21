import { Component, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss']
})
export class StreamingComponent implements OnInit {
  
  public datas!: { music :string, title: string, cover: string};

  toggleButtonLabels: any = [
    {
      name: 'Playlist',
      value: 'playlist'
    },
    {
      name: 'Artist',
      value: 'artist'
    },
    {
      name: 'Albums',
      value: 'albums'
    },
    {
      name: 'Songs',
      value: 'songs'
    },
    {
      name: 'Watchlist',
      value: 'watchlist'
    },
    {
      name: 'Recommended',
      value: 'recommended'
    },
    {
      name: 'Downloaded',
      value: 'downloaded'
    },
    {
      name: 'Content',
      value: 'content'
    },
  ];
  category: string = '';

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.category = 'playlist'
  }

  onCategoryClick(event: any) {
    this.category = event.value;
  }

  openMusicPannel(ev: {show: boolean, music: string, title: string, cover: string}): void {
    this.datas = {
      title: ev.title,
      cover: ev.cover,
      music: ev.music
    }
    this.sharedService.musicData = this.datas;
  }

}
