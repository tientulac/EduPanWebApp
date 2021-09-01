import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HocHamComponent } from './hoc-ham.component';

describe('HocHamComponent', () => {
  let component: HocHamComponent;
  let fixture: ComponentFixture<HocHamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HocHamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HocHamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
