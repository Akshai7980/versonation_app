import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingSongsComponent } from './trending-songs.component';

describe('TrendingSongsComponent', () => {
  let component: TrendingSongsComponent;
  let fixture: ComponentFixture<TrendingSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingSongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
