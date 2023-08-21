import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import {  ProfileData } from 'src/app/models/profiledata';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { EditProfileComponent } from '../../modal/edit-profile/edit-profile.component';

@Component({
  selector: 'app-artist-profile-block',
  templateUrl: './artist-profile-block.component.html',
  styleUrls: ['./artist-profile-block.component.scss']
})
export class ArtistProfileBlockComponent implements OnInit {

  @Input() profileData!:ProfileData;
  @Input() uid!:string;
  @Input() isEdit!:boolean;
  followingCount!: number;
  profileDetails!: any;


  constructor(
    private fbService:FirebaseApiService,
    private sanitizer: DomSanitizer,
    private toast: HotToastService,
    public dialog: MatDialog,
    private router : Router
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  ngOnInit(): void {
    this.loadFollowing();
    this.getProfileDatas();
  }

 

  loadFollowing(): void {
    this.fbService.getFollowing(this.uid).subscribe((res: any) => {
      this.followingCount = res?.artists?.length;
    })
  }

  getProfileDatas(): void {
    this.fbService.getProfile(this.uid).subscribe((resp: any) => {
      this.profileDetails = resp
      console.log(this.profileDetails);
      
    })
  }

  async changeImg(env:any,type:string,){

    const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
    let _base64 = await toBase64(env.files[0])
    if(type === 'coverImageUrl')
    {
      this.profileData.coverImageUrl = this.sanitize(_base64);
      this.toast.success('Cover Image Updated');
    }else{
      this.profileData.profileImageUrl = this.sanitize(_base64);
      this.toast.success('Profile Image Updated');
    }
    this.uploadPicture(_base64,type)
  }

  async uploadPicture(picUrl: any, type: string) {
    const url = await this.fbService.uploadImageAndGetUrl(this.uid, type, picUrl);
    await this.fbService.updateProfile(this.uid, { [type]: url });
  }

  sanitize(url: any) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  openProfileEdit(){
    let dialogRef = this.dialog.open(EditProfileComponent, {
      width: '900px',
      data:{}
    });

    dialogRef.afterClosed().subscribe( res=>{
      if(res)
      {
        
      }
    })
  }

}

