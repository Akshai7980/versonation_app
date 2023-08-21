import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArtistListComponent } from './new-artist-list.component';

describe('NewArtistListComponent', () => {
  let component: NewArtistListComponent;
  let fixture: ComponentFixture<NewArtistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewArtistListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArtistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
