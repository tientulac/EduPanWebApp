import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XacNhanComponent } from './xac-nhan.component';

describe('XacNhanComponent', () => {
  let component: XacNhanComponent;
  let fixture: ComponentFixture<XacNhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XacNhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XacNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
