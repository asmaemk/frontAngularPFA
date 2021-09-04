import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnexityComponent } from './anexity.component';

describe('AnexityComponent', () => {
  let component: AnexityComponent;
  let fixture: ComponentFixture<AnexityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnexityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnexityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
