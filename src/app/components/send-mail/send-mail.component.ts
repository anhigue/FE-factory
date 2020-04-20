import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailInterface } from '../../../interfaces/EmailInterface';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss'],
})
export class SendMailComponent implements OnInit {
  public Mail: EmailInterface = {
    data: null,
    from: null,
    subject: null,
    text: null,
    to: null,
    attachments: null
  };
  formGroupMail: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SendMailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.validateFormMail();
  }

  validateFormMail() {
    this.formGroupMail = this._FORM_BUILDER.group({
      to: ['', Validators.required],
      subject: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  returnMail(): EmailInterface {
    return {
      from: 'Higueros71@gmail.com',
      to: this.Mail.to,
      text: this.Mail.text,
      subject: this.Mail.subject,
      data: this.data,
      attachments: null,
    };
  }
}
