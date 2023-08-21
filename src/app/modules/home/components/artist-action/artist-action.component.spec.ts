import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistActionComponent } from './artist-action.component';

describe('ArtistActionComponent', () => {
  let component: ArtistActionComponent;
  let fixture: ComponentFixture<ArtistActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
