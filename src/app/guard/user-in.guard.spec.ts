import { TestBed, async, inject } from '@angular/core/testing';

import { UserInGuard } from './user-in.guard';

describe('UserInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInGuard]
    });
  });

  it('should ...', inject([UserInGuard], (guard: UserInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
