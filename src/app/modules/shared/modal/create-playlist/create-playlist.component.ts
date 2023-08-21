import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {
  playListForm: any = FormGroup;
  uid: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreatePlaylistComponent>,
    private fbService: FirebaseApiService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toast: HotToastService,
  ) {}

  ngOnInit(): void {
    this.playListForm = this.formBuilder.group({
      name: new FormControl('', Validators.required)
      // description: new FormControl(''),
    });

    this.loginService.getCurrentUserDetails().then(async (user: any) => {
      this.uid = user.uid;
    });
  }

  toClose() {
    this.playListForm.reset();
    this.dialogRef.close(false);
  }

  toCreatePlaylist() {
    const data = {
      name: this.playListForm.value.name,
      Image: '../../assets/chat2.jpg',
      show: false,
      songs: []
    }
    if (this.playListForm.valid) {
      this.fbService
        .addPlaylist(this.uid, data)
        .then((res: any) => {
          console.log(res);
          this.playListForm.reset();
          this.toast.success('New playlist created successfully');
          this.dialogRef.close(true);
        });
    } else {
      this.toast.error('Please enter playlist title');
    }
  }
}
