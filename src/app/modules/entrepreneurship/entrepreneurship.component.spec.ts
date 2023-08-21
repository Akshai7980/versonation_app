import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurshipComponent } from './entrepreneurship.component';

describe('EntrepreneurshipComponent', () => {
  let component: EntrepreneurshipComponent;
  let fixture: ComponentFixture<EntrepreneurshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrepreneurshipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepreneurshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
