import { Component, OnInit, Inject } from '@angular/core';
import { ClientInterface } from '../../../interfaces/ClientInterface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {

  public clientUpdate: ClientInterface;
  formGroupClient: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.clientUpdate = this.data;
    this.formGroupClient = this._FORM_BUILDER.group({
      name: ['', Validators.required],
      timeDelivery: ['', Validators.required],
      token: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
}
