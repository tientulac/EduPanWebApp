import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongTrinhComponent } from './cong-trinh.component';

describe('CongTrinhComponent', () => {
  let component: CongTrinhComponent;
  let fixture: ComponentFixture<CongTrinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongTrinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
