import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { UserModel } from '../Dto/UserModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private targetRoute: string = "/user-info";
  public users: UserModel[] = [];
  public name: string = "";

  constructor(private accountService: AccountService, private router: Router) { }

  public FindByName(): void {
    this.accountService.GetUserByName(this.name).subscribe(data => {
      this.users = data;
    });
  }

  public GetUserInfo(id: number): void {
    this.accountService.PushUserId(id);
    this.router.navigateByUrl(this.targetRoute);
  }

  public async ngOnInit(): Promise<void> {
    this.accountService.ClearParametrs();
    await this.accountService.GetUsers().subscribe(data => {
      this.users = data;
    });
  }

}
