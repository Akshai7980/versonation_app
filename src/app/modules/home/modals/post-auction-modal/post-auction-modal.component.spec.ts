import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAuctionModalComponent } from './post-auction-modal.component';

describe('PostAuctionModalComponent', () => {
  let component: PostAuctionModalComponent;
  let fixture: ComponentFixture<PostAuctionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAuctionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAuctionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
