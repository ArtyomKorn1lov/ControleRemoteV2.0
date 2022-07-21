import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../Services/employer.service';
import { AccountService } from '../Services/account.service';
import { UserModel } from '../Dto/UserModel';
import { Router } from '@angular/router';
import { EmployerCreateModel } from '../Dto/EmployerCreateModel';

@Component({
  selector: 'app-employer-create',
  templateUrl: './employer-create.component.html',
  styleUrls: ['./employer-create.component.css']
})
export class EmployerCreateComponent implements OnInit {

  public name: string | undefined;
  public login: string | undefined;
  public user: UserModel = new UserModel(0, "", "");
  private employerListRoute = "/employer-list";
  private employerCreateRoute = "/employer-create-users";

  constructor(private employerService: EmployerService, private accountService: AccountService, private router: Router) { }

  public CreateEmployer(): void {
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
    var employer = new EmployerCreateModel(this.user.id, this.name, this.login);
    this.employerService.CreateEmployer(employer).subscribe(data => {
      if (data == "success") {
        console.log(data);
        alert(data);
        this.router.navigateByUrl(this.employerListRoute);
        return;
      }
      console.log(data);
      alert(data);
      return;
    });
  }

  public ChoiseUser(): void {
    if (this.name == null || this.name == undefined) {
      this.name = "";
    }
    if (this.login == null || this.login == undefined) {
      this.login = "";
    }
    this.employerService.SaveParametrs(this.name, this.login);
    this.accountService.PushUrl("/employer-create");
    this.router.navigateByUrl(this.employerCreateRoute);
  }

  public async ngOnInit(): Promise<void> {
    let name = this.employerService.GetEmployerName();
    let login = this.employerService.GetEmployerLogin();
    if (name != "" && login != "") {
      this.name = name;
      this.login = login;
    }
    if (this.accountService.GetUserFlag() == 1) {
      await this.accountService.GetUserById(this.accountService.GetUserId()).subscribe(data => {
        this.user = data;
      });
    }
  }

}
