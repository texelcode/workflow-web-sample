import { TestBed, inject } from '@angular/core/testing';

import { IdleService } from './idle.service';

describe('IdleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdleService]
    });
  });

  it('should be created', inject([IdleService], (service: IdleService) => {
    expect(service).toBeTruthy();
  }));
});
