import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Output() openMusicPannel = new EventEmitter<{show: boolean, music: string, title: string, cover: string}>();

  topMusic: any = [];

  constructor(
    private fbService: FirebaseApiService,
    private loaderService: LoaderService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.loginService.getCurrentUserDetails().then(async (user: any) => {
      const uid = user.uid;
      if (uid) {
        this.getSongs(uid);
      }
    });
    this.loaderService.hide();
  }

  getSongs(uid: string) {
    this.fbService
      .getSongsWithPagination(null, uid, '', 'recent', [])
      .pipe(first())
      .subscribe((data: any) => {
        this.topMusic = data;
        console.log('topMusic:', this.topMusic);
      });
  }

  getItem(ev: any): void {
    this.openMusicPannel.emit({show: true, music: ev?.music, title: ev?.name, cover: ev?.popularListimage})
  }
}
