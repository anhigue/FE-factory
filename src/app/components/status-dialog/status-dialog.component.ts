import { Component, OnInit, Inject } from '@angular/core';
import { StatusInterface } from '../../../interfaces/StatusInterface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.scss']
})
export class StatusDialogComponent implements OnInit {

  public statusUpdate: StatusInterface;
  formGroupValidate: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StatusInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.statusUpdate = this.data;
    this.formGroupValidate = this._FORM_BUILDER.group({
      name: ['', Validators.required],
    });
  }
}
