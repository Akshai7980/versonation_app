import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, first } from 'rxjs';
import { LoaderService } from './loader.service';
import { SnackbarService } from './snackbar.service';
import * as auth from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userDetails = null;
  userProfileSubscription = new BehaviorSubject(null);

  constructor(
    private firauth: AngularFireAuth,
    private router: Router,
    private snackbarService: SnackbarService,
    private loaderService: LoaderService,
    private afs: AngularFirestore
  ) {}

  login(email: string, password: string) {
    this.loaderService.show();
    this.firauth
      .signInWithEmailAndPassword(email, password)
      .then((data: any) => {
        const uid = data.user.uid;
        localStorage.setItem(
          'verseUser',
          JSON.stringify({ type: 'user', uid })
        );
        this.loginSuccessHandler(uid);
      })
      .catch((error: any) => {
        console.log('error while signup');
        console.log(error);
        this.loginFailureHandler();
      });
  }

  register(email: string, password: string, userDetails = {}) {
    this.loaderService.show();
    this.firauth
      .createUserWithEmailAndPassword(email, password)
      .then((data: any) => {
        console.log('login successful');
        // this.loginSuccessHandler(data.user.uid);
        const uid = data.user.uid;
        this.afs
          .collection('users')
          .doc(uid)
          .set(userDetails, { merge: true })
          .then((d) => {
            console.log('user details updated');
            localStorage.setItem(
              'verseUser',
              JSON.stringify({ type: 'user', uid })
            );
            this.loginSuccessHandler(uid);
          });
      })
      .catch((error: any) => {
        console.log('error while signup');
        console.log(error);
      });
  }

  googleAuth() {
    return new Promise<any>(async (resolve, reject) => {
      this.firauth
        .signInWithPopup(new auth.GoogleAuthProvider())
        .then(async (resp: any) => {
          this.loginSuccessHandler(resp.user.user.providerData[0].uid);
          console.log('resp:', resp);
          const { accessToken, idToken } = resp;
          const { profile } = resp.additionalUserInfo;
          console.log(JSON.stringify(resp));
          console.log('profile:', profile);
          const userTemp = {
            name: profile.name,
            email: profile.email,
            uid: profile.id,
            role: 'user',
            profilePic: profile.picture,
            verifiedEmail: profile.verified_email,
            enableNotifications: true
          };
          console.log('userTemp:', userTemp);
          resolve(userTemp);
        })
        .catch((error: any) => {
          console.log('error:', error);
          reject('A authentication failure happened!');
          this.loginFailureHandler();
        });
    });
  }

  facebookAuth() {
    return new Promise<any>(async (resolve, reject) => {
      this.firauth
        .signInWithPopup(new auth.FacebookAuthProvider())
        .then(async (resp: any) => {
          this.loginSuccessHandler('');
          console.log('resp:', resp);
          const { displayName, uid, email } = resp.user;
          const userTemp = {
            name: displayName,
            email: email,
            uid: uid,
            role: 'user',
            enableNotifications: true
          };
          resolve(userTemp);
        })
        .catch((error: any) => {
          console.log('error:', error);
          reject('A authentication failure happened!');
          this.loginFailureHandler();
        });
    });
  }

  loginSuccessHandler(uid: string) {
    this.snackbarService.showMessage('Login Successful');
    this.fetchUserDetails(uid).then((d) => {
      this.userProfileSubscription.next(this.userDetails);
      this.router.navigate(['home']);
      this.loaderService.hide();
    });
  }

  loginFailureHandler() {
    this.snackbarService.showMessage('Login Failed');
    this.loaderService.hide();
  }

  fetchUserDetails(uid: string) {
    return new Promise((resolve) => {
      this.afs
        .collection('users')
        .doc(uid)
        .valueChanges()
        .pipe(first())
        .subscribe((data: any) => {
          this.userDetails = data;
          resolve(data);
        });
    });
  }

  async signOut() {
    this.firauth.signOut();
    localStorage.removeItem('verseUser');
    this.router.navigate(['']);
  }

  getCurrentUserDetails() {
    return new Promise((resolve) => {
      if (this.userDetails) {
        resolve(this.userDetails);
      }
      const savedUser = this.getSavedUser();
      if (savedUser && savedUser.uid) {
        this.fetchUserDetails(savedUser.uid).then((d) => resolve(d));
      } else {
        resolve(null);
      }
    });
  }

  async forgotPassword(value: any) {
    const r = this.firauth.sendPasswordResetEmail(value);
  }

  getSavedUser() {
    const user = JSON.parse(localStorage.getItem('verseUser') || 'null');
    if (user) return user;
    this.signOut();
  }

  loginAsGuest() {
    this.userDetails = null;
    localStorage.setItem(
      'verseUser',
      JSON.stringify({ type: 'guest', uid: '' })
    );
    this.router.navigate(['home']);
  }

  isGuest() {
    const user = this.getSavedUser();
    return user.type === 'guest';
  }

  isArtist() {}

  showGuestUserWarning() {
    this.snackbarService.showMessage('Please Login to avail this feature');
  }

  updateSavedUserDetails() {
    const savedUser = this.getSavedUser();
    if (savedUser && savedUser.uid) {
      this.fetchUserDetails(savedUser.uid).then((d) => {
        this.userProfileSubscription.next(this.userDetails);
      });
    }
  }
}
