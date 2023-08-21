import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMusicPlayerComponent } from './footer-music-player.component';

describe('FooterMusicPlayerComponent', () => {
  let component: FooterMusicPlayerComponent;
  let fixture: ComponentFixture<FooterMusicPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterMusicPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterMusicPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
