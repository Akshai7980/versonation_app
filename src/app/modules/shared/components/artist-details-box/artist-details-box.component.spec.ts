import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistDetailsBoxComponent } from './artist-details-box.component';

describe('ArtistDetailsBoxComponent', () => {
  let component: ArtistDetailsBoxComponent;
  let fixture: ComponentFixture<ArtistDetailsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistDetailsBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistDetailsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
