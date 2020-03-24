import { Component, OnInit, Inject } from '@angular/core';
import { ErrorInterface } from '../../../interfaces/ErrorInterface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  constructor(
    public dialogRef: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorInterface
  ) {}

}
