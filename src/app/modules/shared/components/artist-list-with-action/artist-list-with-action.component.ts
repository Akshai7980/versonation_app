import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Artist } from 'src/app/models';
import { IProfileImage } from 'src/app/models/profiledata';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoginService } from 'src/app/services/login.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-artist-list-with-action',
  templateUrl: './artist-list-with-action.component.html',
  styleUrls: ['./artist-list-with-action.component.scss']
})
export class ArtistListWithActionComponent implements OnInit {
  @Input() action = 'follow';
  @Input() artistData: Artist = {
    Image: '',
    name: '',
    id: '',
    followersCount: 0
  };

  isGuest = true;
  user: any = null;
  followList: any = [];
  isFollowed = false;
  profileImage: any = '';

  constructor(
    private loginService: LoginService,
    private fbService: FirebaseApiService,
    private snackbarService: SnackbarService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.isGuest = this.loginService.isGuest();
    if (!this.isGuest) {
      this.loginService.getCurrentUserDetails().then(async (user: any) => {
        this.user = user;

        this.fbService
          .getFollowing(this.user.uid)
          .pipe(first())
          .subscribe((w: any) => {
            this.followList = w && w.artists ? w.artists : [];
            this.isFollowed =
              this.followList.indexOf(this.artistData.id) !== -1;
          });
        this.profileImage = await this.fbService.getStorageImageUrl(
          this.user.uid,
          'profileImageUrl'
        );
      });
    }
  }

  followArtist() {
    console.log(this.artistData);
    if (this.isGuest) {
      this.loginService.showGuestUserWarning();
    } else {
      if (this.isFollowed) {
        this.removeFollowList();
      } else {
        this.addToFollowList();
      }
    }
  }

  addToFollowList() {
    this.fbService
      .updateFollowing(this.user.uid, { artists: [...this.followList] })
      .then((d) => {
        this.snackbarService.showMessage('Added to follow list');
        this.fbService.updateFollowCount(this.artistData.id);
        this.isFollowed = true;
        this.fbService.updatePostNotify(this.artistData.id, {
          date: new Date().toUTCString(),
          image: this.profileImage,
          text: `$${
            this.user.name ? this.user.name : 'Someone'
          } started following you`,
          timestamp: new Date().getTime()
        });
      });
  }

  removeFollowList() {
    this.followList.splice(this.followList.indexOf(this.artistData.id), 1);
    this.fbService
      .updateFollowing(this.user.uid, { artists: [...this.followList] })
      .then((d) => {
        this.snackbarService.showMessage('Removed from follow list');
        this.fbService.updateFollowCount(this.artistData.id);
        this.isFollowed = false;
        this.fbService.updatePostNotify(this.artistData.id, {
          date: new Date().toUTCString(),
          image: this.profileImage,
          text: `$${
            this.user.name ? this.user.name : 'Someone'
          } stopped following you`,
          timestamp: new Date().getTime()
        });
      });
  }

  navigateToProfile(item: IProfileImage): void {
    this.router.navigateByUrl(`/home/profile/${item.id}`)
  }
}
