import { Component, Inject, OnInit } from '@angular/core';
import { UserUpdateModel } from 'src/app/models/UserUpdateModel';
import { AccountService } from 'src/app/services/account.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-reg-update',
  templateUrl: './dialog-reg-update.component.html',
  styleUrls: ['./dialog-reg-update.component.css']
})
export class DialogRegUpdateComponent implements OnInit {

  public user: UserUpdateModel = new UserUpdateModel(0, "", "", "");
  public password: string = "";
  public confirmPassword: string = "";

  constructor(private accountService: AccountService, private dialogRef: MatDialogRef<DialogRegUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public async update(): Promise<void> {
    if (this.user.name == undefined || this.user.name.trim() == '') {
      alert("Введите имя руководителя");
      this.user.name = '';
      return;
    }
    if (this.user.login == undefined || this.user.login.trim() == '') {
      alert("Введите логин руководителя");
      this.user.login = '';
      return;
    }
    if (this.password == undefined || this.password.trim() == '') {
      alert("Введите пароль");
      this.password = '';
      return;
    }
    if (this.confirmPassword == undefined || this.confirmPassword.trim() == '') {
      alert("Повторите пароль");
      this.confirmPassword = '';
      return;
    }
    if (this.confirmPassword != this.password) {
      alert("Пароли не совпадают");
      this.password = '';
      this.confirmPassword = '';
      return;
    }
    this.user.password = this.password;
    await this.accountService.updateUser(this.user).subscribe(data => {
      if(data == "success") {
        alert(data);
        console.log(data);
        this.dialogRef.close({result: "1"});
        return;
      }
      alert("Ошибка обновления пользователя");
      console.log(data);
      this.password = '';
      this.confirmPassword = '';
      return;
    })
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.getUserById(this.data.id).subscribe(data => {
      this.user.id = data.id;
      this.user.login = data.login;
      this.user.name = data.name;
    });
  }

}
