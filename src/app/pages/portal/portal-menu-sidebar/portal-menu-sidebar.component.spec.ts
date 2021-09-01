import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalMenuSidebarComponent } from './portal-menu-sidebar.component';

describe('PortalMenuSidebarComponent', () => {
  let component: PortalMenuSidebarComponent;
  let fixture: ComponentFixture<PortalMenuSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalMenuSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalMenuSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
