import { TestBed } from '@angular/core/testing';

import { GestionTestService } from './gestion-test.service';

describe('GestionTestService', () => {
  let service: GestionTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
