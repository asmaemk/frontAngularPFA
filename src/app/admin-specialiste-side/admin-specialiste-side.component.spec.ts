import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpecialisteSideComponent } from './admin-specialiste-side.component';

describe('AdminSpecialisteSideComponent', () => {
  let component: AdminSpecialisteSideComponent;
  let fixture: ComponentFixture<AdminSpecialisteSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSpecialisteSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSpecialisteSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
