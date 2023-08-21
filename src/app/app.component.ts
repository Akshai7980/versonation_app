import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit, OnDestroy{
  

  title = 'versenationweb';
  isLoading: Subject<boolean>;
  subscription: Subscription[]=[];
  datas!: {
    music: string,
    cover: string,
    title: string
  }
  isFooterMusicPlayer: boolean = false;

  constructor(
    private loaderService: LoaderService,
    private sharedService: SharedService,
    ) {
    this.isLoading = this.loaderService.isLoading;
  }

  ngOnInit(): void {
    this.getMusicDatas();
  }

  getMusicDatas(): void {
    this.subscription.push(
      this.sharedService.musicDatas.subscribe(res => {
        if(res){
          if((res.length > 0 || res.music !== undefined) ){
            this.datas = res;
            this.isFooterMusicPlayer = false;
            setTimeout(() => {
              if((res.length > 0 || res.music !== undefined)) {
                this.isFooterMusicPlayer = true;
              }
            }, 0);
          }
        }
      })
    )
  }

  closeMusicPlayer(ev: any): void {
    localStorage.setItem('closePlayer', 'close');
    this.isFooterMusicPlayer = ev;
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => {el.unsubscribe()});
  }
}
