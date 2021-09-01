import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaPhuongKhoKhanComponent } from './dia-phuong-kho-khan.component';

describe('DiaPhuongKhoKhanComponent', () => {
  let component: DiaPhuongKhoKhanComponent;
  let fixture: ComponentFixture<DiaPhuongKhoKhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaPhuongKhoKhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaPhuongKhoKhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
