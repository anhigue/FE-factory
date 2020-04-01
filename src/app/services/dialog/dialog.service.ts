import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from '../../components/success/success.component';
import { ComponentType } from '@angular/cdk/portal';
import { ErrorComponent } from '../../components/error/error.component';
import { DeleteComponent } from '../../components/delete/delete.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public shareData?: any;
  public height?: string;
  public width?: string;

  constructor(private dialog: MatDialog) {}

  openDialog(comp: ComponentType<unknown>): MatDialogRef<unknown> {
    const dialogRef = this.dialog.open(comp, {
      width: this.width,
      height: this.height,
      data: this.shareData
    });

    return dialogRef;
  }

  showSuccess(): MatDialogRef<unknown> {
    const dialogRef = this.dialog.open(SuccessComponent, {
      data: this.shareData
    });
    return dialogRef;
  }

  showError(
    title?: string,
    message?: string,
    error?: any
  ): MatDialogRef<unknown> {
    this.shareData = {
      title,
      message,
      error
    };
    return this.openDialog(ErrorComponent);
  }

  showDelete(
    title?: string,
    message?: string,
    error?: any
  ): MatDialogRef<unknown> {
    this.shareData = {
      title,
      message,
      error
    };
    return this.openDialog(DeleteComponent);
  }
}
