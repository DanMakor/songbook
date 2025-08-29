import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-update-dialog',
  imports: [],
  templateUrl: './update-dialog.html',
  styleUrl: './update-dialog.css'
})
export class UpdateDialog {
  constructor(public dialogRef: DialogRef) { }
}
