import { Component, OnInit, Inject } from '@angular/core';
import { FactoryInterface } from '../../../interfaces/FactoryInterface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-factory-dialog',
  templateUrl: './factory-dialog.component.html',
  styleUrls: ['./factory-dialog.component.scss']
})
export class FactoryDialogComponent implements OnInit {

  public factoryUpdate: FactoryInterface;
  formGroupFactory: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FactoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FactoryInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.factoryUpdate = this.data;
    this.formGroupFactory = this._FORM_BUILDER.group({
      _id: ['', Validators.required],
      ip: ['', Validators.required],
      token: ['', Validators.required],
      nameFactory: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
}
