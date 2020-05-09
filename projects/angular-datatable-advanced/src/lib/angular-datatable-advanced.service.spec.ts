import { TestBed } from '@angular/core/testing';

import { AngularDatatableAdvancedService } from './angular-datatable-advanced.service';

describe('AngularDatatableAdvancedService', () => {
  let service: AngularDatatableAdvancedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularDatatableAdvancedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
