import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HocBongSinhVienComponent } from './hoc-bong-sinh-vien.component';

describe('HocBongSinhVienComponent', () => {
  let component: HocBongSinhVienComponent;
  let fixture: ComponentFixture<HocBongSinhVienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HocBongSinhVienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HocBongSinhVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
