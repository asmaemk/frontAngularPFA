import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSousAdminSideComponent } from './admin-sous-admin-side.component';

describe('AdminSousAdminSideComponent', () => {
  let component: AdminSousAdminSideComponent;
  let fixture: ComponentFixture<AdminSousAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSousAdminSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSousAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
