import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { EmployerService } from 'src/app/services/employer.service';
import { ActionSortByUserLoginModel } from 'src/app/models/ActionSortByUserLoginModel';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-request-action',
  templateUrl: './request-action.component.html',
  styleUrls: ['./request-action.component.css']
})
export class RequestActionComponent implements OnInit {

  public minuteArray: number[] = [];
  public logins: string[] = ["Все"];
  public selectedLogin: string = this.logins[0];
  public actions: ActionSortByUserLoginModel[] = [];
  public startDate: Date | undefined;
  public endDate: Date | undefined;

  constructor(private accountService: AccountService, private employerService: EmployerService, private reportService: ReportService, private router: Router) { }

  public fillMinuteArray(): void {
    for (let count = 1; count <= 60; count++)
      this.minuteArray.push(count);
  }

  public async getRequest(): Promise<void> {
    /*if (this.startDate == undefined || this.endDate == undefined)
      return;*/

    const start = "2022-09-01";
    const final = "2022-10-19";
    if (this.selectedLogin == "Все") {
      await this.reportService.getAllForTime(start, final).subscribe(data => {
        this.actions = data;
        console.log(this.actions);
        this.convertToNormalDate();
      });
    }
  }

  public convertToNormalDate(): void {
    for(let count_action = 0; count_action < this.actions.length; count_action++) {
      for(let count_day = 0; count_day < this.actions[count_action].commands.length; count_day++) {
        this.actions[count_action].commands[count_day].dateTimeAction = new Date(this.actions[count_action].commands[count_day].dateTimeAction);
        for(let count_hour = 0; count_hour < this.actions[count_action].commands[count_day].commands.length; count_hour++) {
          this.actions[count_action].commands[count_day].commands[count_hour].hourTimeAction = new Date(this.actions[count_action].commands[count_day].commands[count_hour].hourTimeAction);
        }
      }
    }
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.getAuthorizeModel(this.router.url);
    await this.employerService.getByUserLogin().subscribe(async data => {
      this.logins = this.logins.concat(data);
      await this.getRequest();
    });
    this.fillMinuteArray();
  }

}
