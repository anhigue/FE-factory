import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartVehicleDialogComponent } from './part-vehicle-dialog.component';

describe('PartVehicleDialogComponent', () => {
  let component: PartVehicleDialogComponent;
  let fixture: ComponentFixture<PartVehicleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartVehicleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartVehicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
