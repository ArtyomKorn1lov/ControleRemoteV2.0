import { Component, OnInit } from '@angular/core';
import { UserModel } from '../Dto/UserModel';
import { AccountService } from '../Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  private userListRoute: string = "/user-list";
  private userUpdateRoute: string = "/user-update";
  public user: UserModel = new UserModel(0, '', '');

  constructor(private accountService: AccountService, private router: Router) { }

  public UpdateUser(): void {
    this.accountService.PushUserId(this.user.id);
    this.router.navigateByUrl(this.userUpdateRoute);
  }

  public RemoveUser(): void {
    this.accountService.DeleteUser(this.user.id).subscribe(data => {
      if(data == "error") {
        alert("Ошибка удаления пользователя");
        console.log(data);
        return;
      }
      alert(data);
      console.log(data);
      this.router.navigateByUrl(this.userListRoute);
      return;
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.GetUserById(this.accountService.GetUserId()).subscribe(data => {
      this.user = data;
    });
  }

}
