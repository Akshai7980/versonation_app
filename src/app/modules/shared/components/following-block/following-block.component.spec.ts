import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingBlockComponent } from './following-block.component';

describe('FollowingBlockComponent', () => {
  let component: FollowingBlockComponent;
  let fixture: ComponentFixture<FollowingBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowingBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
