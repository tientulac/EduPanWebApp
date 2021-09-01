import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiHoTroComponent } from './loai-ho-tro.component';

describe('LoaiHoTroComponent', () => {
  let component: LoaiHoTroComponent;
  let fixture: ComponentFixture<LoaiHoTroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiHoTroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiHoTroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
