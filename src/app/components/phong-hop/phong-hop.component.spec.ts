import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhongHopComponent } from './phong-hop.component';

describe('PhongHopComponent', () => {
  let component: PhongHopComponent;
  let fixture: ComponentFixture<PhongHopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhongHopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhongHopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
