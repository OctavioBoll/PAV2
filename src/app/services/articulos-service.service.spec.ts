import { TestBed } from '@angular/core/testing';

import { ArticulosServiceService } from './articulos-service.service';

describe('ArticulosServiceService', () => {
  let service: ArticulosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticulosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
