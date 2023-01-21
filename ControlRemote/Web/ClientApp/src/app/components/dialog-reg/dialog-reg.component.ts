import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserCreateModel } from 'src/app/models/UserCreateModel';
import { NoticeDialogComponent } from '../notice-dialog/notice-dialog.component';

@Component({
  selector: 'app-dialog-reg',
  templateUrl: './dialog-reg.component.html',
  styleUrls: ['./dialog-reg.component.css']
})
export class DialogRegComponent implements OnInit {

  public name: string = "";
  public login: string = "";
  public password: string = "";
  public confirmPassword: string = "";

  constructor(private accountService: AccountService, private dialog: MatDialog, private dialogRef: MatDialogRef<DialogRegComponent>) { }
  
  public close(): void {
    this.dialogRef.close();
  }

  public async create(): Promise<void> {
    if (this.name == undefined || this.name.trim() == '') {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Введите имя руководителя" } });
      this.name = '';
      return;
    }
    if (this.login == undefined || this.login.trim() == '') {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Введите логин руководителя" } });
      this.login = '';
      return;
    }
    if (this.password == undefined || this.password.trim() == '') {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Введите пароль" } });
      this.password = '';
      return;
    }
    if (this.confirmPassword == undefined || this.confirmPassword.trim() == '') {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Повторите пароль" } });
      this.confirmPassword = '';
      return;
    }
    if (this.confirmPassword != this.password) {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Пароли не совпадают" } });
      this.password = '';
      this.confirmPassword = '';
      return;
    }
    let model = new UserCreateModel(this.name, this.login, this.password);
    await this.accountService.createUser(model).subscribe({
      next: (data) => {
        console.log(data);
        this.dialogRef.close({ result: "1" });
        return;
      },
      error: (bad) => {
        const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Ошибка создания пользователя" } });
        console.log(bad);
        this.name = '';
        this.login = '';
        this.password = '';
        this.confirmPassword = '';
        return;
      }
    });
  }

  ngOnInit(): void {
  }

}
