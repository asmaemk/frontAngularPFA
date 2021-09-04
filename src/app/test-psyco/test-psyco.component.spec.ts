import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPsycoComponent } from './test-psyco.component';

describe('TestPsycoComponent', () => {
  let component: TestPsycoComponent;
  let fixture: ComponentFixture<TestPsycoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPsycoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPsycoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
