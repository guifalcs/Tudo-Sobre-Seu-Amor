/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpecialDatesService } from './specialDates.service';

describe('Service: SpecialDates', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialDatesService]
    });
  });

  it('should ...', inject([SpecialDatesService], (service: SpecialDatesService) => {
    expect(service).toBeTruthy();
  }));
});
