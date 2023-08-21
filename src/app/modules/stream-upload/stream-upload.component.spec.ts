import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamUploadComponent } from './stream-upload.component';

describe('StreamUploadComponent', () => {
  let component: StreamUploadComponent;
  let fixture: ComponentFixture<StreamUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
