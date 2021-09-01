import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinhVienGianhHbComponent } from './sinh-vien-gianh-hb.component';

describe('SinhVienGianhHbComponent', () => {
  let component: SinhVienGianhHbComponent;
  let fixture: ComponentFixture<SinhVienGianhHbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinhVienGianhHbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinhVienGianhHbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
