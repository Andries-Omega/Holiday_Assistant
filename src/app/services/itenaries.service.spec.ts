import { TestBed } from '@angular/core/testing';

import { ItenariesService } from './itenaries.service';

describe('ItenariesService', () => {
  let service: ItenariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItenariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
