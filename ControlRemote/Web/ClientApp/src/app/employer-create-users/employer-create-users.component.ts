import { Component, OnInit } from '@angular/core';
import { UserModel } from '../Dto/UserModel';
import { AccountService } from '../Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-create-users',
  templateUrl: './employer-create-users.component.html',
  styleUrls: ['./employer-create-users.component.css']
})
export class EmployerCreateUsersComponent implements OnInit {

  public users: UserModel[] = [];
  public name: string = "";

  constructor(private accountService: AccountService, private router: Router) { }

  public FindByName(): void {
    this.accountService.GetUserByName(this.name).subscribe(data => {
      this.users = data;
    });
  }

  public ChoiseUser(id: number): void {
    this.accountService.PushFlag(1);
    this.accountService.PushUserId(id);
    this.router.navigateByUrl(this.accountService.GetUrl());
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.GetUsers().subscribe(data => {
      this.users = data;
    });
  }

}
