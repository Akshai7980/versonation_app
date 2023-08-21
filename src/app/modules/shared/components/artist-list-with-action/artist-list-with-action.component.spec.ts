import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistListWithActionComponent } from './artist-list-with-action.component';

describe('ArtistListWithActionComponent', () => {
  let component: ArtistListWithActionComponent;
  let fixture: ComponentFixture<ArtistListWithActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistListWithActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistListWithActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
