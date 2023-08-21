import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistListTileComponent } from './artist-list-tile.component';

describe('ArtistListTileComponent', () => {
  let component: ArtistListTileComponent;
  let fixture: ComponentFixture<ArtistListTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistListTileComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistListTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
