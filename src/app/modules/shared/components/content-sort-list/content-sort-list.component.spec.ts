import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSortListComponent } from './content-sort-list.component';

describe('ContentSortListComponent', () => {
  let component: ContentSortListComponent;
  let fixture: ComponentFixture<ContentSortListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentSortListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSortListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
