import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacialisteHomeComponent } from './spacialiste-home.component';

describe('SpacialisteHomeComponent', () => {
  let component: SpacialisteHomeComponent;
  let fixture: ComponentFixture<SpacialisteHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacialisteHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacialisteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
