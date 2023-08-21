import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-streaming-sidebar',
  templateUrl: './streaming-sidebar.component.html',
  styleUrls: ['./streaming-sidebar.component.scss']
})
export class StreamingSidebarComponent implements OnInit {

  selectedItem : 'browse' | 'library' | 'radio' | 'upload' | undefined = 'browse';

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  selectItem(type: any): void{
    this.selectedItem = type;
  }

}
