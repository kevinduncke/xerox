import { TestBed } from '@angular/core/testing';

import { database } from './database.service';

describe('database', () => {
  let service: database;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(database);
  });

  it('shoud be created', () => {
    expect(service).toBeTruthy();
  });
});
