import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-create-bidding',
  templateUrl: './create-bidding.component.html',
  styleUrls: ['./create-bidding.component.scss']
})
export class CreateBiddingComponent implements OnInit {

  fileName = '';
 
  options: string[] = ['Verse', 'Beat', 'Chorus',
  'Ad-lib', 'Rift', 'Composition','Poem', 'Song', 'Sound',
  'Phrase', 'Music Notes', 'Story','Movie Script', 'Play Script', 'Tv Script',
];
  options2:string[]=['Verse', 'Beat', 'Chorus',
  'Ad-lib', 'Rift', 'Composition','Poem', 'Song', 'Sound',
  'Phrase', 'Music Notes', 'Story','Movie Script', 'Play Script', 'Tv Script',
];
  licenceTerms:string[]=['6 Months','1 Year']

  filteredOptions:string[]=this.options;
  filteredOptions2:string[]=this.options2;
  filteredOptions3:string[]=this.licenceTerms;

  auctionForm :FormGroup 


  constructor(private fb:FormBuilder) {
    this.auctionForm = fb.group({

      title: new FormControl('',[Validators.required,Validators.minLength(4)]),
    type: new FormControl('',[Validators.required,]),
    price: new FormControl('',[Validators.required,]),
    time: new FormControl('',[Validators.required,]),
    description: new FormControl('',[Validators.required,Validators.minLength(10)]),
    
    useType: new FormControl('',[Validators.required,]),
    description2: new FormControl('',[Validators.required,Validators.minLength(10)]),
    licenceTerm: new FormControl('',[Validators.required,]),
    // exclusive: new FormControl(false,[Validators.required,]),
    image: new FormControl('',[Validators.required,]),
    video: new FormControl('',[Validators.required,]),
    file: new FormControl('',[Validators.required,]),
    document: new FormControl('',[Validators.required,]),
    bidTypes:fb.group({
      regular: new FormControl(true,[Validators.required,]),
      exclusive: new FormControl(true,[Validators.required,]),
      platinum: new FormControl(false,[Validators.required,]),
    })
  });
   }

  ngOnInit(): void {

    this.auctionForm.controls['type'].valueChanges.subscribe(value => { 
      this.filter(value)
    });
    this.auctionForm.controls['useType'].valueChanges.subscribe(value => { 
      this.filter2(value)
    }); 
  }

  submitPost(){
    if(this.auctionForm.valid){
      console.log(this.auctionForm.value)
    }
  }

  onFileSelected(event:any) {
    // console.log(event)

    // let file:File = event.target.files[0];
    // console.log(file,"file")
    // if (file) { 
    //     this.fileName = file.name;
    //     console.log(this.fileName,"filename") 
    // }
  }











  filter(value: string):any{
    let filterValue = value.toLowerCase(); 
    this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(filterValue));
  
  }

  filter2(value: string):any{
    let filterValue = value.toLowerCase(); 
    this.filteredOptions2 = this.options2.filter(option => option.toLowerCase().includes(filterValue));
  
  }

}
