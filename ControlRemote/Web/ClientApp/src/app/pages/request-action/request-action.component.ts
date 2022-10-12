import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-request-action',
  templateUrl: './request-action.component.html',
  styleUrls: ['./request-action.component.css']
})
export class RequestActionComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }

  public async ngOnInit(): Promise<void> {
    await this.accountService.getAuthorizeModel(this.router.url);
  }

}
