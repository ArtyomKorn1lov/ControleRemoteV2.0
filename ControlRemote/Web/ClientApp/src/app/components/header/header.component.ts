import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAuthComponent } from '../dialog-auth/dialog-auth.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public href: string = "";

  constructor(private router: Router, private dialog: MatDialog) { }

  public openAuthDialog(): void {
    const dialogRef = this.dialog.open(DialogAuthComponent);
  }

  public async ngOnInit(): Promise<void> {
    this.href = this.router.url;
  }

}
