import { TestBed } from '@angular/core/testing';

import { OthelloService } from './othello.service';

describe('OthelloService', () => {
  let service: OthelloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OthelloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
