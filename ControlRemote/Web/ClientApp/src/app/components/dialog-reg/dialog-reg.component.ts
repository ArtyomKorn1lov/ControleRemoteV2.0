import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserCreateModel } from 'src/app/models/UserCreateModel';

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

  constructor(private accountService: AccountService, private dialogRef: MatDialogRef<DialogRegComponent>) { }

  public async create(): Promise<void> {
    if (this.name == undefined || this.name.trim() == '') {
      alert("Введите имя руководителя");
      this.name = '';
      return;
    }
    if (this.login == undefined || this.login.trim() == '') {
      alert("Введите логин руководителя");
      this.login = '';
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
    let model = new UserCreateModel(this.name, this.login, this.password);
    await this.accountService.createUser(model).subscribe(data => {
      if(data == "success") {
        alert(data);
        console.log(data);
        this.dialogRef.close({result: "1"});
        return;
      }
      alert("Ошибка создания пользователя");
      console.log(data);
      this.name = '';
      this.login = '';
      this.password = '';
      this.confirmPassword = '';
      return;
    })
  }

  ngOnInit(): void {
  }

}
