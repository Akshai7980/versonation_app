import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistDetailsTileComponent } from './artist-details-tile.component';

describe('ArtistDetailsTileComponent', () => {
  let component: ArtistDetailsTileComponent;
  let fixture: ComponentFixture<ArtistDetailsTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistDetailsTileComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistDetailsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
