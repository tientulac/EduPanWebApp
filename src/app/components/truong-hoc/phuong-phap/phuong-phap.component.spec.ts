import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuongPhapComponent } from './phuong-phap.component';

describe('PhuongPhapComponent', () => {
  let component: PhuongPhapComponent;
  let fixture: ComponentFixture<PhuongPhapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhuongPhapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhuongPhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
