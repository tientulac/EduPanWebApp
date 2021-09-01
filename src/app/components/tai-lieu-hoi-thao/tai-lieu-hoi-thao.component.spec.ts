import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiLieuHoiThaoComponent } from './tai-lieu-hoi-thao.component';

describe('TaiLieuHoiThaoComponent', () => {
  let component: TaiLieuHoiThaoComponent;
  let fixture: ComponentFixture<TaiLieuHoiThaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiLieuHoiThaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiLieuHoiThaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
