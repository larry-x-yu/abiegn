import { TestBed, inject } from '@angular/core/testing';

import { CarandorderService } from './carandorder.service';

describe('CarandorderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarandorderService]
    });
  });

  it('should be created', inject([CarandorderService], (service: CarandorderService) => {
    expect(service).toBeTruthy();
  }));
});
