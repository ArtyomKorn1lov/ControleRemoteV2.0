import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAuthComponent } from '../dialog-auth/dialog-auth.component';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public name: string | undefined;
  public status: string | undefined;

  constructor(public dialog: MatDialog, private accountService: AccountService) { }

  public openAuthDialog(): void {
    const dialogRef = this.dialog.open(DialogAuthComponent);
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.IsUserAuthorized().subscribe(data => {
      this.name = data.name,
      this.status = data.type
    });
  }
}
