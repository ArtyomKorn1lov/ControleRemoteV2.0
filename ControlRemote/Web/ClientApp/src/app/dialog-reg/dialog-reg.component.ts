import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterModel } from '../Dto/RegisterModel';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-dialog-reg',
  templateUrl: './dialog-reg.component.html',
  styleUrls: ['./dialog-reg.component.css']
})
export class DialogRegComponent implements OnInit {

  public name: string | undefined;
  public login: string | undefined;
  public password: string | undefined;
  public confirm_password: string | undefined;

  constructor(public dialogRef: MatDialogRef<DialogRegComponent>, private authService: AccountService) { }

  public Registration(): void {
    if (this.name == undefined || this.name.trim() == '') {
      alert("Введите имя пользователя");
      this.name = '';
      return;
    }
    if (this.login == undefined || this.login.trim() == '') {
      alert("Введите логин");
      this.login = '';
      return;
    }
    if (this.password == undefined || this.password.trim() == '') {
      alert("Введите пароль");
      this.password = '';
      return;
    }
    if (this.confirm_password == undefined || this.password.trim() == '') {
      alert("Подтвердите пароль");
      this.confirm_password = '';
      return;
    }
    if (this.confirm_password != this.password) {
      alert("Пароли не совпадают, проверьте пароли");
      this.password = '';
      this.confirm_password = '';
      return;
    }
    var model = new RegisterModel(this.name, this.login, this.password);
    this.authService.Registration(model).subscribe(data => {
      if(data == "success") {
        console.log(data);
        alert(data);
        this.dialogRef.close();
        location.reload();
        return;
      }
      if(data == "authorize") {
        alert("Пользователь уже авторизован");
        console.log(data);
        this.name = '';
        this.login = '';
        this.password = '';
        this.confirm_password = '';
        return;
      }
      alert("Некорректные логин и(или) пароль");
      console.log(data);
      this.name = '';
      this.login = '';
      this.password = '';
      this.confirm_password = '';
      return;
    });
  }

  ngOnInit(): void {
  }

}
