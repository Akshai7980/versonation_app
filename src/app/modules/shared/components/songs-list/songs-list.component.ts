import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit {
  @Input() songs: any;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {}

  playSong(song: any) {
    const data = {
      title: song.name,
      cover: song.popularListimage,
      music: song.music
    }
    this.sharedService.musicData = data;
  }

}
