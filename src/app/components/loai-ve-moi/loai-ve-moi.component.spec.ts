import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiVeMoiComponent } from './loai-ve-moi.component';

describe('LoaiVeMoiComponent', () => {
  let component: LoaiVeMoiComponent;
  let fixture: ComponentFixture<LoaiVeMoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiVeMoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiVeMoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
