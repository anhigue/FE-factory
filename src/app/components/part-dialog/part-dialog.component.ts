import { Component, OnInit, Inject } from '@angular/core';
import { PartInterface } from '../../../interfaces/PartInterface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-part-dialog',
  templateUrl: './part-dialog.component.html',
  styleUrls: ['./part-dialog.component.scss']
})
export class PartDialogComponent implements OnInit {
  public partUpdate: PartInterface;
  formGroupProduct: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PartInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.partUpdate = this.data;
    this.formGroupProduct = this._FORM_BUILDER.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      partNo: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
}
