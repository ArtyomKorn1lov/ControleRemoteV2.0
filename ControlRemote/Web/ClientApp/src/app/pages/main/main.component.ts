import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private controlUrl: string = "/user-control";
  private requestUrl: string = "/request-action"

  constructor(private accountService: AccountService, private router: Router) { }

  public logOut(): void {
    if (this.accountService.logOut())
      alert("Успешный выход");
    else
      alert("Ошибка выхода");
  }

  public async ngOnInit(): Promise<void> {
    this.accountService.currentUrl = this.router.url;
    this.accountService.getAuthoriseModel();
    if (this.accountService.userFlag)
      await this.accountService.getAuthorizeModel().subscribe(data => {
        this.accountService.authorize = data;
      });
  }

}
