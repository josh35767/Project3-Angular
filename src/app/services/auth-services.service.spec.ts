import { TestBed, inject } from '@angular/core/testing';

import { AuthServicesService } from './auth-services.service';

describe('AuthServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthServicesService]
    });
  });

  it('should be created', inject([AuthServicesService], (service: AuthServicesService) => {
    expect(service).toBeTruthy();
  }));
});
