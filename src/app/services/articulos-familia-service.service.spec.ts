import { TestBed } from '@angular/core/testing';

import { ArticulosFamiliaServiceService } from './articulos-familia-service.service';

describe('ArticulosFamiliaServiceService', () => {
  let service: ArticulosFamiliaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticulosFamiliaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
