import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { DialogAuthComponent } from '../dialog-auth/dialog-auth.component';
import { NoticeDialogComponent } from '../notice-dialog/notice-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public tragetRoute: string = "/";
  public adminRoute: string = "/user-control";
  public managerRoute: string = "/request-action"

  constructor(private router: Router, private dialog: MatDialog, public accountService: AccountService) { }

  public openAuthDialog(): void {
    const dialogRef = this.dialog.open(DialogAuthComponent);
  }

  public navigateWorkPage(): void {
    if(this.accountService.authorize.type == "admin") {
      this.router.navigateByUrl(this.adminRoute);
      return;
    }
    this.router.navigateByUrl(this.managerRoute);
  }

  public logOut(): void {
    if (this.accountService.logOut()) {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Успешный выход" } });
    }
    else {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Ошибка выхода" } });
    }
    this.router.navigateByUrl(this.tragetRoute);
  }

  ngOnInit(): void {
  }

}
