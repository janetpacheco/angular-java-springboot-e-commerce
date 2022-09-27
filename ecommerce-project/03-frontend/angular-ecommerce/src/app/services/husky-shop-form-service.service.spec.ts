import { TestBed } from '@angular/core/testing';

import { HuskyShopFormService } from './husky-shop-form-service.service';

describe('HuskyShopFormService', () => {
  let service: HuskyShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HuskyShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
