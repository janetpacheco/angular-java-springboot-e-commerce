import { TestBed } from '@angular/core/testing';

import { HuskyShopServiceService } from './husky-shop-service.service';

describe('HuskyShopServiceService', () => {
  let service: HuskyShopServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HuskyShopServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
