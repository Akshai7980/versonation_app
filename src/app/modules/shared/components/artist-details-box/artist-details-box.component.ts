import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoginService } from 'src/app/services/login.service';
import { Comments } from '../comments/comments.component';

@Component({
  selector: 'app-artist-details-box',
  templateUrl: './artist-details-box.component.html',
  styleUrls: ['./artist-details-box.component.scss']
})
export class ArtistDetailsBoxComponent implements OnInit {
  @Input() postData: any;
  @Input() uid!: string;
  track: any = null;
  profileImage: any = '';


  constructor(
    private loginService: LoginService,
    private fbService: FirebaseApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  async toggleLike() {
    if (this.loginService.isGuest()) {
      this.loginService.showGuestUserWarning();
    } else {
      this.loginService.getCurrentUserDetails().then(async (user: any) => {
        console.log(user);
        const index = this.postData.likedBy.indexOf(this.uid);
        if (index === -1) {
          this.postData.likedBy.push(this.uid);
        } else {
          this.postData.likedBy.splice(index, 1);
        }
        this.fbService.updatePost(this.postData.id, {
          likedBy: this.postData.likedBy
        });
        if (this.uid !== this.postData.createdUserId) {
          this.fbService.updatePostNotify(this.postData.createdUserId, {
            date: new Date().toUTCString(),
            image: this.profileImage,
            text: `${user.name ? user.name : 'Someone'} reacted to your post`,
            timestamp: new Date().getTime()
          });
        }
      });
    }
  }

  async toggleFlame() {
    if (this.loginService.isGuest()) {
      this.loginService.showGuestUserWarning();
    } else {
      this.loginService.getCurrentUserDetails().then(async (user: any) => {
        console.log(user);
        const index = this.postData.flame.indexOf(this.uid);
        if (index === -1) {
          this.postData.flame.push(this.uid);
        } else {
          this.postData.flame.splice(index, 1);
        }
        this.fbService.updatePost(this.postData.id, {
          flame: this.postData.flame
        });
        if (this.uid !== this.postData.createdUserId) {
          this.fbService.updatePostNotify(this.postData.createdUserId, {
            date: new Date().toUTCString(),
            image: this.profileImage,
            text: `${user.name ? user.name : 'Someone'} reacted to your post`,
            timestamp: new Date().getTime()
          });
        }
      });
    }
  }

  async showComments() {
    if (this.loginService.isGuest()) {
      this.loginService.showGuestUserWarning();
    } else {
      // Add lofic for paid user and artist here
      this.dialog.open(Comments, {
        width: '60%',
        data: {
          postId: this.postData.id
        }
      });
    }
  }



  getToCardType(card: any) {}

  playMusicTrack(music: any) {}

  openPlaylist(card: any) {}

  playPostVideo(url: string) {}

  playPostAudio() {}

  closePostAudio() {}

}
