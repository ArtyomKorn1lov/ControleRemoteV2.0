import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.css']
})
export class DialogSearchComponent implements OnInit {

  public name: string = "";

  constructor(public dialogRef: MatDialogRef<DialogSearchComponent>) { }

  public async search(): Promise<void> {
    if(this.name == "")
      return;
    this.dialogRef.close({searchName: this.name});
  }

  ngOnInit(): void {
  }

}
