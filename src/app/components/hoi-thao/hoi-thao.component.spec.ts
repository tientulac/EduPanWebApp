import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoiThaoComponent } from './hoi-thao.component';

describe('HoiThaoComponent', () => {
  let component: HoiThaoComponent;
  let fixture: ComponentFixture<HoiThaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoiThaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoiThaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
