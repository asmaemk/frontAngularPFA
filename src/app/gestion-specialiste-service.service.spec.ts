import { TestBed } from '@angular/core/testing';

import { GestionSpecialisteServiceService } from './gestion-specialiste-service.service';

describe('GestionSpecialisteServiceService', () => {
  let service: GestionSpecialisteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionSpecialisteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
