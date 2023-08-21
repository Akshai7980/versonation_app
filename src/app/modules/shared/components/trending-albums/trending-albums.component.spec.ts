import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingAlbumsComponent } from './trending-albums.component';

describe('TrendingAlbumsComponent', () => {
  let component: TrendingAlbumsComponent;
  let fixture: ComponentFixture<TrendingAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingAlbumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
