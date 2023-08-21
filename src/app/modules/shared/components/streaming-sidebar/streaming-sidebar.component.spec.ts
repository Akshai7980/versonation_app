import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingSidebarComponent } from './streaming-sidebar.component';

describe('StreamingSidebarComponent', () => {
  let component: StreamingSidebarComponent;
  let fixture: ComponentFixture<StreamingSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamingSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamingSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
