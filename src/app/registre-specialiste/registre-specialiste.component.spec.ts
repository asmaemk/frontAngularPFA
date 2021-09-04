import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistreSpecialisteComponent } from './registre-specialiste.component';

describe('RegistreSpecialisteComponent', () => {
  let component: RegistreSpecialisteComponent;
  let fixture: ComponentFixture<RegistreSpecialisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistreSpecialisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistreSpecialisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
