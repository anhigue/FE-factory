import { TestBed, async, inject } from '@angular/core/testing';

import { UserOutGuard } from './user-out.guard';

describe('UserOutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserOutGuard]
    });
  });

  it('should ...', inject([UserOutGuard], (guard: UserOutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
