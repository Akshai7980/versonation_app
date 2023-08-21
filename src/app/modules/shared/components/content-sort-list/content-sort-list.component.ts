import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-content-sort-list',
  templateUrl: './content-sort-list.component.html',
  styleUrls: ['./content-sort-list.component.scss']
})
export class ContentSortListComponent implements OnInit {
  topMusic: any = [];
  @Output() openMusicPannel = new EventEmitter<{show: boolean, music: string, title: string, cover: string}>();
  @Input() serachTerm!: string;
  constructor(
    private fbService: FirebaseApiService ,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id: string | null;
    this.route.paramMap.subscribe(params => {
      id = params.get('id');
    })

    this.loginService.getCurrentUserDetails().then(async (user: any) => {
      const uid = user.uid;
      if (id) {
        this.getSongs(id);
      }else{
        this.getSongs(uid);
      }
    });
  }

  getSongs(uid: string): void {
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
