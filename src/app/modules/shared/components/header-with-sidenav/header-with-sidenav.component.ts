import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header-with-sidenav',
  templateUrl: './header-with-sidenav.component.html',
  styleUrls: ['./header-with-sidenav.component.scss']
})
export class HeaderWithSidenavComponent implements OnInit, OnDestroy {
  constructor(
    private loginService: LoginService,
    private fbService: FirebaseApiService,
    private _router: Router
  ) {}

  status = false;
  isGuest = true;
  user: any = null;
  userSubscription: any;
  profileImage: any = '';
  selectedItem : 'home' |'streaming' | 'about' | 'help' | undefined;
  currentRoute!: string;

  ngOnInit(): void {
    console.log(this._router);
    
    this.isGuest = this.loginService.isGuest();
    this.loginService.getCurrentUserDetails().then((user: any) => {
      this.user = user;
      this.getProfileImage();
    });
    this.userSubscription = this.loginService.userProfileSubscription.subscribe(
      (user: any) => {
        this.user = user;
        this.getProfileImage();
      }
    );

    this.currentRoute = this._router.url;
    this.getRoute();
  }

  async getProfileImage() {
    this.profileImage = await this.fbService.getStorageImageUrl(
      this.user?.uid,
      'profileImageUrl'
    );
  }

  signOut() {
    this.loginService.signOut();
  }

  toggleSideBar() {
    this.status = !this.status;
  }

  selectItem(type: 'home' | 'streaming' | 'about' | 'help'): void{
    console.log(type);
    this.selectedItem = type;
  }

  getRoute(): void{
    let url = this._router.url;
    console.log(url);
    
    if(url == '/home'){
      this.selectedItem = 'home';
    }else if(url == '/streaming'){
      this.selectedItem ='streaming';
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
