import { TestBed, async, inject } from '@angular/core/testing';

import { LoginClientGuard } from './login-client.guard';

describe('LoginClientGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginClientGuard]
    });
  });

  it('should ...', inject([LoginClientGuard], (guard: LoginClientGuard) => {
    expect(guard).toBeTruthy();
  }));
});
