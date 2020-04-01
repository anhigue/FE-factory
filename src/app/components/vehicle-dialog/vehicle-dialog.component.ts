import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleInterface } from '../../../interfaces/VehicleInterface';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.scss']
})
export class VehicleDialogComponent implements OnInit {
  public vehicleUpdate: VehicleInterface;
  formGroupVehicle: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<VehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.vehicleUpdate = this.data;
    this.formGroupVehicle = this._FORM_BUILDER.group({
      universalCode: ['', Validators.required],
      brand: ['', Validators.required],
      line: ['', Validators.required],
      year: ['', Validators.required]
    });
  }
}
