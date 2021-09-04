import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSpecialisteComponent } from './modifier-specialiste.component';

describe('ModifierSpecialisteComponent', () => {
  let component: ModifierSpecialisteComponent;
  let fixture: ComponentFixture<ModifierSpecialisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierSpecialisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierSpecialisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
