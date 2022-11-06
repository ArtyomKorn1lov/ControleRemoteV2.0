import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-image',
  templateUrl: './dialog-image.component.html',
  styleUrls: ['./dialog-image.component.css']
})
export class DialogImageComponent implements OnInit {

  public imageBase64: string = "";

  constructor(public dialogRef: MatDialogRef<DialogImageComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public ngOnInit(): void {
    this.imageBase64 = this.data.image;
  }

}
