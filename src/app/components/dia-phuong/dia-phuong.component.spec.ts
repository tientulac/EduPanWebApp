import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaPhuongComponent } from './dia-phuong.component';

describe('DiaPhuongComponent', () => {
  let component: DiaPhuongComponent;
  let fixture: ComponentFixture<DiaPhuongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaPhuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaPhuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
