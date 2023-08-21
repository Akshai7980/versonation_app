import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PostAuctionModalComponent } from '../../modals/post-auction-modal/post-auction-modal.component';



@Component({
  selector: 'app-artist-action',
  templateUrl: './artist-action.component.html',
  styleUrls: ['./artist-action.component.scss']
})
export class ArtistActionComponent implements OnInit {
  
 
  
  typeValue!: string;
  useTypeValue!: string;
  userTermValue!: string;
  sortValue!:string;
  timeValue!:string;
  priceValue!:string

  color = 'accent';
  checked = false;
  licenceTerms:string[]=['6 Months','1 Year']
  types: string[] = [ 
    'Verse', 'Beat', 'Chorus',
  'Ad-lib', 'Rift', 'Composition','Poem', 'Song', 'Sound',
  'Phrase', 'Music Notes', 'Story','Movie Script', 'Play Script', 'Tv Script',
  ];
  sort:string[]=['Coming soon','Ending soon']
  time:string[]=['Low to High','High to Low']
  price:string[]=['Low to High','High to Low']

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }


  

  filterForm = new FormGroup({ 
    live:new FormControl(true),
    upcoming:new FormControl(false),
    closed:new FormControl(false),
  });

  constructor(private router:Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  postAuction(): void {
    // this._dialog.open(PostAuctionModalComponent, {
    //   width: '600px',
    //   disableClose: false
    // })

    this.router.navigate(['/create-bid'])

  }


  changed(){
    console.log(this.checked)
  }

}
