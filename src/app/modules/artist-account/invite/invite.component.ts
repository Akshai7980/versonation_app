import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  artistList: any = []
  allArtistList: any = []
  linkList: any = []
  links: any = []

  followedArtist: any = []

  showMoreArtist: boolean = false

  form = new FormGroup({
    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern(
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$/

        )
      ]),
  })

  artistForm = new FormGroup({
    name: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(4)
      ]),
  })

  constructor(private fbService: FirebaseApiService, private formBuilder: FormBuilder) {




    let data: any = localStorage.getItem('verseUser')
    let parsedData = JSON.parse(data).uid 
    // let parsedData = "s5qu8istlDZYo9JaUHm78oy2XmF2"
    fbService.getFollowing(parsedData).subscribe(res => {
      if(res){
        let result:any = res
      this.followedArtist = result.artists
      } 
      this.followedArtist.push(parsedData) 
    })

    fbService.getTopArtists().subscribe(res => {
      res.forEach((a: any, b) => {
        for (let i = 0; i < this.followedArtist.length; i++) {
          if (a.id == this.followedArtist[i]) {
            res.splice(b, 1)
          }
        }
      })
      this.allArtistList = res
      this.artistList = res.slice(0, 6)
     })
  }

  ngOnInit(): void {
  }

  sendLink() {
    if (this.form || this.artistForm) {
      console.log("send link")
    }
  }

  add() {
    if (this.form.valid || this.artistForm.valid) {


      if (this.form.valid && !this.links.includes(this.form.get('email')?.value)) {

        this.linkList.push(this.form.value)
        this.links.push(this.form.get('email')?.value)
      }
      if (this.artistForm.valid && !this.links.includes(this.artistForm.get('name')?.value)) {
        this.linkList.push(this.artistForm.value)
        this.links.push(this.artistForm.get('name')?.value)
      }
    }
    this.form.reset()
    this.artistForm.reset()
  }

  showMore() {
    this.showMoreArtist = !this.showMoreArtist
    if (this.showMoreArtist) {
      this.artistList = this.allArtistList.slice(0, 12)
    }
    else {
      this.artistList = this.allArtistList.slice(0, 6)
    }

  }

  removeItem(index: any) {
    this.linkList.splice(index, 1)
    this.links.splice(index, 1)
  }

}
