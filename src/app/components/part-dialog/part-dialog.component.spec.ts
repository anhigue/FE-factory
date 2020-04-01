import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartDialogComponent } from './part-dialog.component';

describe('PartDialogComponent', () => {
  let component: PartDialogComponent;
  let fixture: ComponentFixture<PartDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
