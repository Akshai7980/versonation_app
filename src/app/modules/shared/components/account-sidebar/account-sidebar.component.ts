import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrls: ['./account-sidebar.component.scss']
})
export class AccountSidebarComponent implements OnInit {

  selectedItem : 'quantity' | 'payment-details' | 'invite' | 'upgrade' | 'analytics' | 'earnings' | undefined ;

  constructor(
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.getCurrentRoute();
  }

  selectItem(type: 'quantity' | 'payment-details' | 'invite' | 'upgrade' | 'analytics' | 'earnings' ) :void {
    this.selectedItem = type;
  }

  getCurrentRoute(): void {
    let url = this._router.url;
    if(url == '/artist-account/earnings'){
      this.selectedItem = 'earnings';
    }else if(url == '/artist-account/payment-details'){
      this.selectedItem = 'payment-details';
    }else if(url == '/artist-account/invite'){
      this.selectedItem = 'invite';
    }else if(url == '/artist-account/upgrade'){
      this.selectedItem = 'upgrade';
    }else if(url == '/artist-account/analytics'){
      this.selectedItem = 'analytics'
    }else if(url == '/artist-account/quantity'){
      this.selectedItem ='quantity'
    }
  }
}
