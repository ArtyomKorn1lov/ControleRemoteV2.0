import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css']
})
export class UserControlComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }

  public async ngOnInit(): Promise<void> {
    await this.accountService.getAuthorizeModel(this.router.url);
  }

}
