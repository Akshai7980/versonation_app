import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { first } from 'rxjs';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-tab-component',
  templateUrl: './tab-component.component.html',
  styleUrls: ['./tab-component.component.scss'],
  
})

export class TabComponentComponent implements OnInit {

  @Input() postData!:any;
  @Input() isEdit!:boolean;
  @Input() uid!:string;
  @Output() refreshPosts: EventEmitter<any> = new EventEmitter()
  artists:any[]=[];
  profileDetails: any;
  feedText: string = '';
  mediaUrl: any = null;
  public datas!: { music :string, title: string, cover: string};
  serachTerm!: string;

  @ViewChild('media') mediaUploadVar: any;

  constructor(
    private fbService:FirebaseApiService,
    private toast: HotToastService,
    private loaderService: LoaderService,
    private sharedService: SharedService

  ) { }

  ngOnInit(): void {  
    this.getTopArtist()  
    this.getProfileData();
  }

  getProfileData(): void {
    this.fbService.getProfile(this.uid).subscribe((resp: any) => {
      this.profileDetails = resp;
    })
  }

  getTopArtist() {
    this.fbService
      .getTopArtists()
      .pipe(first())
      .subscribe((data: any) => {
        this.artists = [...data].slice(0,6);
      });
  }

  async postNewFeed() {
    if (this.feedText === '' && !this.mediaUrl)
      return;
    this.loaderService.show();

    let imageUrl: any = '';

    if (this.mediaUrl) {
      const type = `timelineMedia_${new Date().getTime()}`;
      imageUrl = await this.fbService.uploadImageAndGetUrl(this.uid, type, this.mediaUrl);
    }
    
    const type = `post_${new Date().getTime()}`;

    const data = {
      post: this.feedText,
      createdUserId: this.uid,
      creadtedUserName: this.profileDetails?.name,
      createdAt: new Date().toUTCString(),
      timestamp: new Date().getTime(),
      currentTrack: '',
      image: imageUrl,
      teaserAudioUrl: '',
      teaserVideoUrl: '',
      top1Music: '',
      top3Artits: []
    };

    await this.fbService
      .addPost(this.uid, data, type)
      .then(() => {
        this.feedText = '';
        this.removeMedia();
        this.refreshPosts.emit()
        this.toast.success('Your post successfully posted to timeline');
        return this.loaderService.hide();
      })
      .catch(async (err) => {
        this.toast.error('post upload error');
        return this.loaderService.hide();
      });
  }

  async uploadMedia(env: any) {
    const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    this.mediaUrl = await toBase64(env.files[0])
  }

  removeMedia() {
    this.mediaUrl = null;
    this.mediaUploadVar.nativeElement.value = "";
  }

  openMusicPannel(ev: {show: boolean, music: string, title: string, cover: string}): void {
    this.datas = {
      title: ev.title,
      cover: ev.cover,
      music: ev.music
    }
    this.sharedService.musicData = this.datas;
  }

  getSerchTerm(event: any): void {
    this.serachTerm = event?.target?.value;
  }

}
