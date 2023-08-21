import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { first } from 'rxjs';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  _user: any = JSON.parse(localStorage.getItem('verseUser') || 'null');
  userDetails:any;
  profileForm!:FormGroup;
  genresList:any[]=[];
  Tagitems:any[]=[];
  searchedGenre:any;
  filteredGenres:any[]=[];
  isGenreAvailable =false

  constructor(
    private fbService: FirebaseApiService,
    private fb:FormBuilder,
    private toast: HotToastService,
    public dialogRef: MatDialogRef<EditProfileComponent> 
  ){

  }


  ngOnInit(): void {
    this.getAllTabs();
    this.initProfileForm();
    this.getUserProfile();
  }

  async getUserProfile() {

    this.fbService.getProfile(this._user.uid)
      .pipe(first())
      .subscribe((data: any) => {
        this.userDetails = data;
        this.patchProfileForm()
      });
  }

  initProfileForm(){

    this.profileForm = this.fb.group({
      name: new FormControl('' ),
      gender: new FormControl(''),
      dob: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
      bestdescription: new FormControl( ''),
      bio: new FormControl(''),
      work: new FormControl(''),
      contact: new FormControl( ''),
      address: new FormControl(''),
    });
  }

  patchProfileForm(){
    const dob = new Date(this.userDetails['dob']);
    

    this.profileForm.patchValue({
      name: this.userDetails['name'] ,
      gender: this.userDetails['gender'],
      dob: this.formatDate(new Date(this.userDetails['dob'])),
      city: this.userDetails['city'],
      state: this.userDetails['state'],
      zip: this.userDetails['zip'],
      bestdescription: this.userDetails['bestdescription'],
      bio: this.userDetails['bio'],
      work: this.userDetails['work'],
      contact: this.userDetails['contact'],
      address: this.userDetails['address'],
    });
  }

  formatDate(date:any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }


  getAllTabs(){
    this.fbService.getTags().subscribe((data) => {
      this.Tagitems = data.docs.map((doc) => {
        return doc.data();
      });
      this.genresList = this.Tagitems.filter((g) => this.userDetails['genre'].indexOf(g.value)>=0); 
      
    });
  }


  filterGenre() {
    if (this.searchedGenre) {
      this.filteredGenres = [
        ...this.Tagitems.filter(
          (t) => t.name.toLowerCase().indexOf(this.searchedGenre.toLowerCase()) > -1 && this.genresList.indexOf(t) === -1
        ),
      ];
      if (this.filteredGenres.length) {
        this.isGenreAvailable = true;
      } else {
        this.isGenreAvailable = false;
      }
    } else {
      this.isGenreAvailable = false;
    }
  }

  addGenre(genre:any) {
    this.isGenreAvailable = false;
    this.searchedGenre = '';
    this.genresList.push(genre);
  }

  removeGenre(itemIndex:number) {
    this.genresList.splice(itemIndex, 1);
  }

  async updateProfile() {
    const name = this.profileForm.controls['name'].value;
    if (name) {
      const data = { ...this.profileForm.value, genre: this.genresList.map((g) => g.value) };
      await this.fbService.updateProfile(this._user.uid, data);
      await this.fbService.updateUserCollection(this._user.uid, data);
      this.toast.success('Profile Updated');
      this.dialogRef.close(true);
    } else {
      this.toast.error('Please enter name');
      return;
    }
  }
  

}