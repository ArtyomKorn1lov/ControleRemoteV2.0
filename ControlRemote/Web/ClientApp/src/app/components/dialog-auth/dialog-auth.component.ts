import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { LoginModel } from 'src/app/models/LoginModel';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NoticeDialogComponent } from '../notice-dialog/notice-dialog.component';

@Component({
  selector: 'app-dialog-auth',
  templateUrl: './dialog-auth.component.html',
  styleUrls: ['./dialog-auth.component.css']
})
export class DialogAuthComponent implements OnInit {
  public login: string = "";
  public password: string = "";
  private controleRoute: string = "/user-control";
  private requestRoute: string = "/request-action";

  constructor(public dialogRef: MatDialogRef<DialogAuthComponent>, private dialog: MatDialog, private accountService: AccountService, private router: Router) { }

  public async authorize(): Promise<void> {
    if (this.login == undefined || this.login.trim() == '') {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Введите логин пользователя" } });
      this.login = '';
      return;
    }
    if (this.password == undefined || this.password.trim() == '') {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Введите пароль" } });
      this.password = '';
      return;
    }
    let loginModel = new LoginModel(this.login, this.password);
    await this.accountService.login(loginModel).subscribe({
      next: async (data) => {
        console.log("success");
        const token = data.token;
        const refreshToken = data.refreshToken;
        this.accountService.saveTokens(token, refreshToken);
        this.dialogRef.close();
        await this.choiseUrl();
        return;
      },
      error: (bad) => {
        const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Некорректные логин и(или) пароль" } });
        console.log(bad);
        this.login = '';
        this.password = '';
        return;
      }
    });
  }

  public async choiseUrl(): Promise<void> {
    await this.accountService.getAuthorizeModel().subscribe(data => {
      this.accountService.authorize = data;
      this.accountService.userFlag = true;
      if (data.type == "admin")
        this.router.navigateByUrl(this.controleRoute);
      else
        this.router.navigateByUrl(this.requestRoute);
    });

  }

  ngOnInit(): void {
  }

}
