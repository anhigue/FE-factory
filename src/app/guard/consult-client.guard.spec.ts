import { TestBed, async, inject } from '@angular/core/testing';

import { ConsultClientGuard } from './consult-client.guard';

describe('ConsultClientGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultClientGuard]
    });
  });

  it('should ...', inject([ConsultClientGuard], (guard: ConsultClientGuard) => {
    expect(guard).toBeTruthy();
  }));
});
