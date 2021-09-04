import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientSideComponent } from './admin-client-side.component';

describe('AdminClientSideComponent', () => {
  let component: AdminClientSideComponent;
  let fixture: ComponentFixture<AdminClientSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminClientSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
