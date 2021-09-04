import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepressionComponent } from './depression.component';

describe('DepressionComponent', () => {
  let component: DepressionComponent;
  let fixture: ComponentFixture<DepressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
