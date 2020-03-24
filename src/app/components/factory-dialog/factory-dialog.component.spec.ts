import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryDialogComponent } from './factory-dialog.component';

describe('FactoryDialogComponent', () => {
  let component: FactoryDialogComponent;
  let fixture: ComponentFixture<FactoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
