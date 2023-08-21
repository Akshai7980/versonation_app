import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistProfileBlockComponent } from './artist-profile-block.component';

describe('ArtistProfileBlockComponent', () => {
  let component: ArtistProfileBlockComponent;
  let fixture: ComponentFixture<ArtistProfileBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistProfileBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistProfileBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
