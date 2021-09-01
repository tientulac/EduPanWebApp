import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinhVienComponent } from './sinh-vien.component';

describe('SinhVienComponent', () => {
  let component: SinhVienComponent;
  let fixture: ComponentFixture<SinhVienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinhVienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinhVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
