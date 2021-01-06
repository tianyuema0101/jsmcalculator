import { TestBed } from '@angular/core/testing';

import { AdditionalInscriptionServiceService } from './additional-inscription-service.service';

describe('AdditionalInscriptionServiceService', () => {
  let service: AdditionalInscriptionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalInscriptionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
