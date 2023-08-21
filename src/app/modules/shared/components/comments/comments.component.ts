import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class Comments implements OnInit {
  user: any = null;
  postId: string = '';
  comments: any = [];
  form: any = null;
  profileImage: any = '';
  coverImage: any = '';
  profileImg = 'assets/profile.jpg';

  constructor(
    private fbService: FirebaseApiService,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.initialiseComment();
  }

  async initialiseComment() {
    this.postId = this.data.postId;
    this.loginService.getCurrentUserDetails().then(async (user: any) => {
      this.user = user;
      this.getComments();
      this.form = this.formBuilder.group({
        comment: ''
      });

      this.profileImage = await this.fbService.getStorageImageUrl(
        this.user.uid,
        'profileImageUrl'
      );
      this.coverImage = await this.fbService.getStorageImageUrl(
        this.user.uid,
        'coverImageUrl'
      );
    });
  }

  async getComments() {
    this.loaderService.show();

    this.fbService.getComments(this.postId).subscribe((querySnapshot: any) => {
      this.comments = querySnapshot.docs.map((doc: any) => {
        const d = doc.data();
        return { id: doc.id, like: false, love: false, smile: false, ...d };
      });
      this.loaderService.hide();
      this.comments.forEach((comment: any) => {
        this.fbService
          .getProfile(comment.userId)
          .pipe(first())
          .subscribe((userDetails: any) => {
            comment.user = userDetails;
          });
      });
    });
  }

  submitComment() {
    this.loaderService.show();
    const comment = this.form.value['comment'];
    if (comment) {
      const data = {
        comment,
        postId: this.postId,
        userId: this.user.uid,
        userName: this.user.name,
        date: new Date().toUTCString(),
        timestamp: new Date().getTime(),
        profileImageUrl: this.profileImage
      };
      this.fbService.addComment(data).then(() => {
        this.form.controls['comment'].setValue('');
        this.getComments();
      });
    }
  }

  navigateToArtistProfile(id: string) {}
}
