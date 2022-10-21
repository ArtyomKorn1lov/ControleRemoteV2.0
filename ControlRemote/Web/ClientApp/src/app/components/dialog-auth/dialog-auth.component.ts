import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { LoginModel } from 'src/app/models/LoginModel';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-auth',
  templateUrl: './dialog-auth.component.html',
  styleUrls: ['./dialog-auth.component.css']
})
export class DialogAuthComponent implements OnInit {
  public login: string = "";
  public password: string = "";
  private conroleRoute: string = "/user-control";
  private requestRoute: string = "/request-action";

  constructor(public dialogRef: MatDialogRef<DialogAuthComponent>, private accountService: AccountService, private router: Router) { }

  public async authorize(): Promise<void> {
    if (this.login == undefined || this.login.trim() == '') {
      alert("Введите логин пользователя");
      this.login = '';
      return;
    }
    if (this.password == undefined || this.password.trim() == '') {
      alert("Введите пароль");
      this.password = '';
      return;
    }
    let loginModel = new LoginModel(this.login, this.password);
    await this.accountService.login(loginModel).subscribe(async data => {
      if (data.token == "error") {
        alert("Некорректные логин и(или) пароль");
        console.log(data);
        this.login = '';
        this.password = '';
        return;
      }
      alert("success");
      console.log(data);
      const token = data.token;
      const refreshToken = data.refreshToken;
      this.accountService.saveTokens(token, refreshToken);
      this.dialogRef.close();
      //await this.choiseUrl();
      return;
    });
  }

  public async choiseUrl(): Promise<void> {
    await this.accountService.isUserAuthorized().subscribe(data => {
      if (data.type == "admin") {
        this.router.navigateByUrl(this.conroleRoute);
        return;
      }
      this.router.navigateByUrl(this.requestRoute);
      return;
    });
  }

  ngOnInit(): void {
  }

}
