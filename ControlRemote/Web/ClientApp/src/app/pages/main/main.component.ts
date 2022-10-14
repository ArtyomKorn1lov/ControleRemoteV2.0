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

  public async checkAccount(): Promise<void> {
    console.log(this.accountService.authorize.type);
    if(this.accountService.authorize.type == "admin")
      this.router.navigateByUrl(this.controlUrl);
    if(this.accountService.authorize.type == "manager")
      this.router.navigateByUrl(this.controlUrl);
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.getAuthorizeModel(this.router.url);
    await this.checkAccount();
  }

}
