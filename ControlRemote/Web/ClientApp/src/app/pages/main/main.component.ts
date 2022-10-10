import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAuthComponent } from 'src/app/components/dialog-auth/dialog-auth.component';
import { DialogRegComponent } from 'src/app/components/dialog-reg/dialog-reg.component';
import { DialogEmpComponent } from 'src/app/components/dialog-emp/dialog-emp.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  public openAuthDialog(): void {
    const dialogRef = this.dialog.open(DialogAuthComponent);
  }

  public openRegDialog(): void {
    const dialogRef = this.dialog.open(DialogRegComponent);
  }

  public openEmpDialog(): void {
    const dialogRef = this.dialog.open(DialogEmpComponent);
  }

  ngOnInit(): void {
  }

}
