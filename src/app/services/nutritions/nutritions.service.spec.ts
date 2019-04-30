import { TestBed } from '@angular/core/testing';

import { NutritionsService } from './nutritions.service';

describe('NutritionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NutritionsService = TestBed.get(NutritionsService);
    expect(service).toBeTruthy();
  });
});
