import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpecialisteComponent } from './update-specialiste.component';

describe('UpdateSpecialisteComponent', () => {
  let component: UpdateSpecialisteComponent;
  let fixture: ComponentFixture<UpdateSpecialisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSpecialisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSpecialisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
