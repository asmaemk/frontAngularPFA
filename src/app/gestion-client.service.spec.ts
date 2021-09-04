import { TestBed } from '@angular/core/testing';

import { GestionClientService } from './gestion-client.service';

describe('GestionClientService', () => {
  let service: GestionClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
