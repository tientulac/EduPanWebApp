import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuongPhapNghienCuuComponent } from './phuong-phap-nghien-cuu.component';

describe('PhuongPhapNghienCuuComponent', () => {
  let component: PhuongPhapNghienCuuComponent;
  let fixture: ComponentFixture<PhuongPhapNghienCuuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhuongPhapNghienCuuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhuongPhapNghienCuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
