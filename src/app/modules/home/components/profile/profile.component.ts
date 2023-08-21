import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs';
import { ProfileData } from 'src/app/models/profiledata';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']

})
export class ProfileComponent implements OnInit {

  profileData!: ProfileData;

  _user: any = JSON.parse(localStorage.getItem('verseUser') || 'null');
  _uid!:string;
  posts: any = [];
  topMusic: any = [];
  isTimeline=true;

  constructor(
    private fbService: FirebaseApiService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute

  ) {

    this.route.params.subscribe((params: Params) => {
      console.log(params['id']);
      
      if(params['id'])
      {
        this._uid = params['id'];
        this.getArtistPosts()
        if(params['id']!==this._user.uid)
        {
          this.isTimeline = false;
        }
      }
      else{
        this._uid = this._user.uid;
        this.isTimeline = true;
        this.getSongs();   
      }
      this.getUserProfile();
      
   })

  }

  ngOnInit(): void {
    this.actions();
  }

  actions(){
    
  }




  async getUserProfile() {

    this.fbService.getProfile(this._uid)
      .pipe(first())
      .subscribe((data: any) => {
        this.profileData = data;
        // console.log(this.profileData);
        
      });
  }

  getSongs(){
    this.fbService
    .getTopSongs()
    .pipe(first())
    .subscribe((data: any) => {
      this.topMusic = [...data];
      this.getPosts();
    });
  }

  async getPosts(event = null) {
    this.posts =[];
    this.fbService
      .getPostsFromTable(null)
      .pipe(first())
      .subscribe((querySnapshot) => {
        // this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
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

        newPosts.forEach((post: any) => {
          this.fbService
            .getComments(post.id)
            .pipe(first())
            .subscribe((qs: any) => {
              post['commentsCount'] = qs && qs.size ? qs.size : 0;
            });
          this.fbService
            .getProfile(post.createdUserId)
            .pipe(first())
            .subscribe((userProfile: any) => {
              post.createdUser = userProfile;
            });
        });
        this.posts = [...newPosts];
      });
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


  getArtistPosts() {
    this.posts =[];
    this.fbService.getPosts(null, this._uid).subscribe((querySnapshot: any) => {
      const newPosts = querySnapshot.map((doc:any) => {
        if (doc.teaserUrl) {
          doc.teaserUrl = this.sanitize(doc.teaserUrl);
        }
        return doc;
      });
      if (!(this.posts.length && newPosts.length && this.posts[0].id === newPosts[0].id)) {
        this.posts = this.posts.concat(newPosts);
      }
    });
  }


}
