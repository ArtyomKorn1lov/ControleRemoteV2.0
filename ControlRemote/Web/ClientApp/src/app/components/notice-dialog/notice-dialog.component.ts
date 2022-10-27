import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notice-dialog',
  templateUrl: './notice-dialog.component.html',
  styleUrls: ['./notice-dialog.component.css']
})
export class NoticeDialogComponent implements OnInit {

  public message: string = "";

  constructor(public dialogRef: MatDialogRef<NoticeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public close(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.message = this.data.message;
  }

}
