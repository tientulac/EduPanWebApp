import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongTrinhNghienCuuComponent } from './cong-trinh-nghien-cuu.component';

describe('CongTrinhNghienCuuComponent', () => {
  let component: CongTrinhNghienCuuComponent;
  let fixture: ComponentFixture<CongTrinhNghienCuuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongTrinhNghienCuuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongTrinhNghienCuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
