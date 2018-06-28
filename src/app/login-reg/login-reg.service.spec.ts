import { TestBed, inject } from '@angular/core/testing';

import { LoginRegService } from './login-reg.service';

describe('LoginRegService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
