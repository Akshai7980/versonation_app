import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  artists: any = [];
  searchTerm='';
  searchArtistList:any[]=[];
  selectedItem : 'nation_timeline' | 'our_members' | 'entrepreneurship' | 'store' | undefined ;

  constructor(
    private fbService: FirebaseApiService,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.getTopArtist();
    this.getCurrentRoute();
  }

  getTopArtist() {
    this.fbService
      .getTopArtists()
      .pipe(first())
      .subscribe((data: any) => {
        this.artists = [...data];
      });
  }

  searchArtist(){
    
    this.fbService.getArtistsWithPagination(null,this.searchTerm,null,null)
    .subscribe((res:any)=>{
      this.searchArtistList = res;
    })
  }

  gotoArtistProfile(id:string){
    this.searchTerm=''
    this.router.navigateByUrl(`home/profile/${id}`);
  }

  selectItem(type: 'nation_timeline' | 'our_members' | 'entrepreneurship' | 'store') :void {
    this.selectedItem = type;
  }

  getCurrentRoute(): void {
    let url = this.router.url;
    if(url == '/home'){
      this.selectedItem = 'nation_timeline';
    }else if(url == '/our-members'){
      this.selectedItem = 'our_members';
    }else if(url == '/entrepreneurship'){
      this.selectedItem = 'entrepreneurship';
    }
  }
}
