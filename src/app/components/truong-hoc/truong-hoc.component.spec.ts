import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruongHocComponent } from './truong-hoc.component';

describe('TruongHocComponent', () => {
  let component: TruongHocComponent;
  let fixture: ComponentFixture<TruongHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruongHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruongHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
