import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorInRoutingComponent } from './error-in-routing.component';

describe('ErrorInRoutingComponent', () => {
  let component: ErrorInRoutingComponent;
  let fixture: ComponentFixture<ErrorInRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorInRoutingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorInRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
