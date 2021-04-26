import { TestBed } from '@angular/core/testing';

import { DivorcePredictorService } from './divorce-predictor.service';

describe('DivorcePredictorService', () => {
  let service: DivorcePredictorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivorcePredictorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
