import { TestBed } from '@angular/core/testing';

import { SigortaService } from './sigorta.service';

describe('SigortaService', () => {
  let service: SigortaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigortaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
