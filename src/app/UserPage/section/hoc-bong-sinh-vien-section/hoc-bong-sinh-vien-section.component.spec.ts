import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HocBongSinhVienSectionComponent } from './hoc-bong-sinh-vien-section.component';

describe('HocBongSinhVienSectionComponent', () => {
  let component: HocBongSinhVienSectionComponent;
  let fixture: ComponentFixture<HocBongSinhVienSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HocBongSinhVienSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HocBongSinhVienSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
