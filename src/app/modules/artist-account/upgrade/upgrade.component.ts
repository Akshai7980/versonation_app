import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  upgradePlans = [
    {
      free: {
        title: 'Free Version',
        description: 'Free Version',
        price: {
          monthly: '0$',
          yearly: '0$'
        },
        features: [
          {
            feature: "Direct Sell",
            sub_feature:[{
              sub:"Cannot sell & purchase"},
            //   {
            //   sub:"second demo"
            // }
          ],
            avalability: true
          },
          {
            feature: "Auction House",
            sub_feature:[{
              sub:"Can Sell/Post Bidding Room"},{
              sub:"Cannot Enter Rooms to Purchase"
            }],
            avalability: true
          },
          {
            feature: "Store",
            sub_feature:[{
              sub:"Cannot Sell  but can Purchase"}, ],
            avalability: true
          },
          {
            feature: "Timeline",
            sub_feature:[{
              sub:"Cannot Post"}, 
          ],
            avalability: true
          },
          {
            feature: "Streaming",
            sub_feature:[{
              sub:"Upload Only (Artist accounts)"}, 
          ],
            avalability: true
          },
          {
            feature: "Can Send invite link",
            avalability: false
          },
          {
            feature: "2 Devices logged",
            avalability: false
          },
          {
            feature: "Entrance into All Bidding rooms",
            avalability: false
          }, 
          {
            feature: "Advertisements",
            avalability: true
          },
        ],
      },
      plus: {
        title: 'Big Break Membership',
        description: 'Big Break Membership',
        price: {
          monthly: '$21.99',
          yearly: '$125.99'
        },
        features: [
          {
            feature: "Entrance into All Bidding rooms",
            avalability: true
          },
          {
            feature: "Auction House",
            sub_feature:[{
              sub:"Open 25 Auction Rooms at a time"},{
              sub:"Cannot Enter Rooms to Purchase"
            }],
            avalability: true
          },
          {
            feature: "Direct Sell",
            sub_feature:[{
              sub:"Direct Sell 10 Licenses at a time"},{
              sub:"Direct Sell Content (4 Uses in License)"
            }],
            avalability: true
          },
          {
            feature: "2 Devices logged",
            avalability: true
          },
          
          {
            feature: "Streaming Content Upload Only",
            avalability: true
          },
          {
            feature: "Can Send invite link",
            avalability: false
          },
          {
            feature: "Access to Exclusive and Platinum Bid",
            avalability: false
          },
          {
            feature: "Other",
            sub_feature:[{
              sub:"Unlimited Followers"},{
              sub:"Can Follow other Artist"
            },{
              sub:"Exclusive Licensing"}, 
          ],
            avalability: true
          },
        ],
      },
      advanced: {
        title: 'Power Membership',
        description: 'Power Membership',
        price: {
          monthly: '$40.99',
          yearly: '$350.99'
        },
        features: [
          {
            feature: "Get Entrance into All Bidding rooms",
            avalability: true
          },
          {
            feature: "Unlimited Devices logged",
            avalability: true
          },
          {
            feature: "Can Send invite link",
            avalability: true
          },
          {
            feature: "Access to Exclusive and platinum Bid",
            avalability: true
          }, 
          {
            feature: "Auction House",
            sub_feature:[{
              sub:"Unlimited Auction Rooms"},
              {
              sub:"Room Capacity(50-1000)"},
              {
              sub:"Automatic re entry for duplicate licenses"
            },{
              sub:"Duplicate license and unlimited license per room"}
          ],
            avalability: true
          },
          {
            feature: "Customizable terms",
            avalability: true
          },
          {
            feature: "Direct Sell",
            sub_feature:[{
              sub:"Sell unlimited Licenses at a time"} ],
            avalability: true
          }, 
          
          
          {
            feature: "Live Streaming",
            avalability: true
          },
          {
            feature: "Can View Analytics",
            avalability: true
          },
          {
            feature: "Other",
            sub_feature:[{
              sub:"Exclusive Licensing "},
              {
                sub:"Can Follow other Artist"
              },{
              sub:"Unlimited Artist Types"
            },{
              sub:"Exclusive Licensing"},{
              sub:"Make Post"},{
              sub:"Respond to Post"
            },
          ],
            avalability: true
          },
          
        ],
      }
    }
  ]

  constructor() { }

  ngOnInit(): void { 
  }

}
