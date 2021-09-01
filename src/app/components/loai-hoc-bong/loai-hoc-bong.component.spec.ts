import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiHocBongComponent } from './loai-hoc-bong.component';

describe('LoaiHocBongComponent', () => {
  let component: LoaiHocBongComponent;
  let fixture: ComponentFixture<LoaiHocBongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiHocBongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiHocBongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
