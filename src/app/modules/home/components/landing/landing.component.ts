import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from 'src/app/services/loader.service';
import { HotToastService } from '@ngneat/hot-toast';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  posts: any = [];
  topMusic: any = [];
  lastDoc: any = null;
  infiniteScrollDisabled: boolean = false;
  feedText: string = '';
  mediaUrl: any = null;
  uid!:string;
  profileDetails: any;
  isGuest: boolean = true;

  @ViewChild('media') mediaUploadVar: any;

  constructor(
    private fbService: FirebaseApiService,
    private sanitizer: DomSanitizer,
    private loaderService: LoaderService,
    private toast: HotToastService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.isGuest = this.loginService.isGuest();
    this.fbService
      .getTopSongs()
      .pipe(first())
      .subscribe((data: any) => {
        this.topMusic = [...data];
        this.getPosts();
      });
    this.getProfileData();
  }

  async getProfileData() {
    this.uid = await this.loginService.getSavedUser().uid || '';
    this.fbService.getProfile(this.uid).subscribe((resp: any) => {
      this.profileDetails = resp;
    })
  }

  async getPosts(event: any = null) {
    this.fbService
      .getPostsFromTable(this.lastDoc)
      .pipe(first())
      .subscribe((querySnapshot) => {
        this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        const newPosts = querySnapshot.docs.map((doc) => {
          const data: any = doc.data();
          if (data.top1Music) {
            data.top1Music = this.topMusic.filter(
              (music: any) => music.id === data.top1Music
            );
          }
          if (data.currentTrack) {
            data.top1Music = this.topMusic.filter(
              (music: any) => music.id === data.currentTrack
            );
          }
          if (data.teaserUrl) {
            data.teaserUrl = this.sanitize(data.teaserUrl);
          }
          return {
            id: doc.id,
            like: false,
            love: false,
            smile: false,
            commentsCount: '',
            likedBy: data.likedBy ? data.likedBy : [],
            sad: data.sad ? data.sad : [],
            flame: data.flame ? data.flame : [],
            thumbsDown: data.thumbsDown ? data.thumbsDown : [],
            blackFist: data.blackFist ? data.blackFist : [],
            ...data
          };
        });

        if (
          newPosts.length < 30 ||
          (this.posts.length && this.posts[0].id === newPosts[0].id)
        ) {
          if (event) {
            this.infiniteScrollDisabled = true;
          }
        }
        if (
          !(
            this.posts.length &&
            newPosts.length &&
            this.posts[0].id === newPosts[0].id
          )
        ) {
          newPosts.forEach((post: any) => {
            this.fbService.getComments(post.id).subscribe((qs) => {
              post['commentsCount'] = qs && qs.size ? qs.size : 0;
            });
            this.fbService
              .getProfile(post.createdUserId)
              .pipe(first())
              .subscribe((userProfile) => {
                post.createdUser = userProfile;
              });
          });
          this.posts = this.posts.concat(newPosts);
          this.loaderService.hide();
          console.log(this.posts);
        }
      });
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
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
        this.lastDoc = null;
        this.posts = [];
        this.feedText = '';
        this.removeMedia();
        this.getPosts();
        return this.toast.success('Your post successfully posted to timeline');
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
}
