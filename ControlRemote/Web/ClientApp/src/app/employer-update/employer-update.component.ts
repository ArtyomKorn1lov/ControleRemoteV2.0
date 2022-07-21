import { Component, OnInit } from '@angular/core';
import { UserModel } from '../Dto/UserModel';
import { EmployerModel } from '../Dto/EmployerModel';
import { EmployerService } from '../Services/employer.service';
import { AccountService } from '../Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-update',
  templateUrl: './employer-update.component.html',
  styleUrls: ['./employer-update.component.css']
})
export class EmployerUpdateComponent implements OnInit {

  private employerInfoRoute: string = "/employer-info";
  private employerCreateRoute: string = "/employer-create-users";
  private id: number | undefined;
  public employer: EmployerModel = new EmployerModel(0, 0, "", "");
  public user: UserModel = new UserModel(0, "", "");
  public name: string = "";
  public login: string = "";

  constructor(private router: Router, private employerService: EmployerService, private accountService: AccountService) { }

  public ChoiseUser(): void {
    if (this.name == null || this.name == undefined) {
      this.name = "";
    }
    if (this.login == null || this.login == undefined) {
      this.login = "";
    }
    this.employerService.SaveParametrs(this.name, this.login);
    this.accountService.PushUrl("/employer-update");
    this.router.navigateByUrl(this.employerCreateRoute);
  }

  public UpdateEmployer(): void {
    if(this.id == undefined) {
      alert("Ошибка получения сотрудника, запрос на обновление невозможен");
      return;
    }
    if (this.name == undefined || this.name.trim() == '') {
      alert("Введите имя сотрудника");
      this.name = '';
      return;
    }
    if (this.login == undefined || this.login.trim() == '') {
      alert("Введите логин");
      this.login = '';
      return;
    }
    if (this.accountService.GetUserFlag() == 0) {
      alert("Выберете руководителя");
      this.user = new UserModel(0, "", "");
      return;
    }
    var model = new EmployerModel(this.id, this.user.id, this.name, this.login);
    this.employerService.UpdateEmployer(model).subscribe(data => {
      if(data == "error") {
        alert("Ошибка обновления сотрудника");
        console.log(data);
        return;
      }
      alert(data);
      console.log(data);
      this.router.navigateByUrl(this.employerInfoRoute);
      return;
    })
  }

  public async ngOnInit(): Promise<void> {
    this.id = this.employerService.GetEmployerId();
    let name = this.employerService.GetEmployerName();
    let login = this.employerService.GetEmployerLogin();
    if (name != "" && login != "") {
      this.name = name;
      this.login = login;
      if (this.accountService.GetUserFlag() == 1) {
        await this.accountService.GetUserById(this.accountService.GetUserId()).subscribe(data => {
          this.user = data;
        });
      }
      return;
    }
    await this.employerService.GetEmployerById(this.employerService.GetEmployerId()).subscribe(async data => {
      this.name = data.name;
      this.login = data.login;
      await this.accountService.GetUserById(data.managerId).subscribe(data => {
        if(data != null) {
          this.user = data;
        }
      });
    });
  }

}
