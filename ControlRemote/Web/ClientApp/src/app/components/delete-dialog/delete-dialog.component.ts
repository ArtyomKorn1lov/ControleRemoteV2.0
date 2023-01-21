import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  public close(): void {
    this.dialogRef.close();
  }

  public confirm(): void {
    this.dialogRef.close({flag: true});
  }

  public refuse(): void {
    this.dialogRef.close({flag: false});
  }

  ngOnInit(): void {
  }

}
