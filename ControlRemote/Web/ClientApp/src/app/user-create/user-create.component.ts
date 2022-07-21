import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { UserCreateModel } from '../Dto/UserCreateModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public name: string | undefined;
  public login: string | undefined;
  public password: string | undefined;
  public confirm_password: string | undefined;
  private targetRoute = "/user-list";

  constructor(private accountService: AccountService, private router: Router) { }

  public CreateUser(): void {
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
    var model = new UserCreateModel(this.name, this.login, this.password);
    this.accountService.CreateUser(model).subscribe(data => {
      if(data == "success") {
        console.log(data);
        alert(data);
        this.router.navigateByUrl(this.targetRoute);
        return;
      }
      if(data == "create") {
        alert("Пользователь с данным логином уже создан");
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
