import { TestBed } from '@angular/core/testing';

import { SqlqueryService } from './sqlquery.service';

describe('SqlqueryService', () => {
  let service: SqlqueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqlqueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
