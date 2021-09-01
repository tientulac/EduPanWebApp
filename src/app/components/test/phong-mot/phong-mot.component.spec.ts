import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhongMotComponent } from './phong-mot.component';

describe('PhongMotComponent', () => {
  let component: PhongMotComponent;
  let fixture: ComponentFixture<PhongMotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhongMotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhongMotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
