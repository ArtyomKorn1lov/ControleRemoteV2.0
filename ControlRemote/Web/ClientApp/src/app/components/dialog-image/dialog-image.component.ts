import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-image',
  templateUrl: './dialog-image.component.html',
  styleUrls: ['./dialog-image.component.css']
})
export class DialogImageComponent implements OnInit {

  public imageBase64: string = "";
  public domain: string = "";
  public login: string = "";
  public name: string = "";
  public station: string = "";
  public date: string = "";
  public time: string = "";

  constructor(public dialogRef: MatDialogRef<DialogImageComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public close(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.imageBase64 = this.data.image;
    this.domain = this.data.domain;
    this.login = this.data.login;
    this.name = this.data.name;
    this.station = this.data.station;
    this.date = this.data.date;
    this.time = this.data.time;
  }

}
