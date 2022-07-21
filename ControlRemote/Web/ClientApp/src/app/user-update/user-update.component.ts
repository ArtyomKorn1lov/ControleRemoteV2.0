import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { UserUpdateModel } from '../Dto/UserUpdateModel';
import { UserModel } from '../Dto/UserModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  public name: string | undefined;
  public login: string | undefined;
  public password: string | undefined;
  public confirm_password: string | undefined;
  private targetRoute = "/user-info";
  private id: number | undefined;

  constructor(private accountService: AccountService, private router: Router) { }

  public UpdateUser(): void {
    if(this.id == undefined) {
      alert("Ошибка получения пользователя, запрос на обновление невозможен");
      return;
    }
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
    var model = new UserUpdateModel(this.id, this.name, this.login, this.password);
    this.accountService.UpdateUser(model).subscribe(data => {
      if(data == "error") {
        alert("Ошибка обновления пользователя");
        console.log(data);
        return;
      }
      alert(data);
      console.log(data);
      this.router.navigateByUrl(this.targetRoute);
      return;
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.GetUserById(this.accountService.GetUserId()).subscribe(data => {
      this.id = data.id
      this.name = data.name;
      this.login = data.login;
    });
  }

}
