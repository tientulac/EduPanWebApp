import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachHoTroComponent } from './danh-sach-ho-tro.component';

describe('DanhSachHoTroComponent', () => {
  let component: DanhSachHoTroComponent;
  let fixture: ComponentFixture<DanhSachHoTroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachHoTroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachHoTroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
