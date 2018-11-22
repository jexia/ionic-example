import { TestBed, inject } from '@angular/core/testing';

import { JexiaDataService } from './jexia-data.service';

describe('JexiaDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JexiaDataService]
    });
  });

  it('should be created', inject([JexiaDataService], (service: JexiaDataService) => {
    expect(service).toBeTruthy();
  }));
});
