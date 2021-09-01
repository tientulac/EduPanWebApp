import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuyenGiaComponent } from './chuyen-gia.component';

describe('ChuyenGiaComponent', () => {
  let component: ChuyenGiaComponent;
  let fixture: ComponentFixture<ChuyenGiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChuyenGiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuyenGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
