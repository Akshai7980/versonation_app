import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, OnDestroy,  Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';

@Component({
  selector: 'app-footer-music-player',
  templateUrl: './footer-music-player.component.html',
  styleUrls: ['./footer-music-player.component.scss']
})
export class FooterMusicPlayerComponent implements OnInit, OnDestroy, OnChanges {

  @Input() datas!: { music: string, title: string, cover: string};
  @Output() closeMusicPlayer = new EventEmitter;
  songs: any = [];
  audioList: {url : string, title: string, cover: string}[]=[];
  loading = true

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private fbService: FirebaseApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchSongs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
   
  
    this.datas.music = changes['datas'].currentValue.music;
    this.datas.cover = changes['datas'].currentValue.cover;
    this.datas.title = changes['datas'].currentValue.title;
    this.audioList = [
      {
        url : this.datas.music,
        title: this.datas.title,
        cover: this.datas.cover
      }
    ]

    console.log(this.audioList);
    
 
    this.fetchSongs();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation= 'reload';
    // this.router.navigate(['./'],{relativeTo: this.route})
  }

  async fetchSongs() {
    this.fbService.getSongs().subscribe(async (querySnapshot: any) => {

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
      this.songs.forEach((el: any) => {
        this.audioList.push({
          url: el.music,
          title: el.name,
          cover: el.popularListimage
        })
      });
    });
  }

  close(): void {
    this.closeMusicPlayer.emit(false);
  }

  ngOnDestroy(): void {
    this.audioList = [];
  }

}
