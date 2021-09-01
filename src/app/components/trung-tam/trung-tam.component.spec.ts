import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrungTamComponent } from './trung-tam.component';

describe('TrungTamComponent', () => {
  let component: TrungTamComponent;
  let fixture: ComponentFixture<TrungTamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrungTamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrungTamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
