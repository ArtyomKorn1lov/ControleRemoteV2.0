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
  public startDate: string | undefined;
  public endDate: string | undefined;
  public waitFlag: boolean = false;

  constructor(private accountService: AccountService, private employerService: EmployerService, private reportService: ReportService, private router: Router) { }

  public fillMinuteArray(): void {
    for (let count = 1; count <= 60; count++)
      this.minuteArray.push(count);
  }

  public async getRequest(): Promise<void> {
    if (this.startDate == undefined || this.endDate == undefined)
      return;
    const start = new Date(this.startDate);
    const final = new Date(this.endDate);
    if (start >= final) {
      alert("Некорректный диапазон");
      return;
    }
    this.actions = [];
    if (this.selectedLogin == "Все") {
      this.waitFlag = true;
      await this.reportService.getAllForTime(this.startDate, this.endDate).subscribe(data => {
        this.actions = data;
        this.convertToNormalDate();
        this.waitFlag = false;
      });
    }
    else {
      this.waitFlag = true
      await this.reportService.getByLoginForTime(this.selectedLogin, this.startDate, this.endDate).subscribe(data => {
        this.actions = data;
        this.convertToNormalDate();
        this.waitFlag = false;
      });
    }
  }

  public convertToNormalDate(): void {
    for (let count_action = 0; count_action < this.actions.length; count_action++) {
      for (let count_day = 0; count_day < this.actions[count_action].commands.length; count_day++) {
        this.actions[count_action].commands[count_day].dateTimeAction = new Date(this.actions[count_action].commands[count_day].dateTimeAction);
        for (let count_hour = 0; count_hour < this.actions[count_action].commands[count_day].commands.length; count_hour++) {
          this.actions[count_action].commands[count_day].commands[count_hour].hourTimeAction = new Date(this.actions[count_action].commands[count_day].commands[count_hour].hourTimeAction);
        }
      }
    }
  }

  public printZero(hour: number): string {
    if (hour < 10)
      return '0' + hour;
    return hour.toString();
  }

  public async ngOnInit(): Promise<void> {
    this.accountService.isAuthorized();
    let currentDate = new Date();
    this.endDate = currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDate();
    currentDate.setDate(currentDate.getDate() - 1);
    this.startDate = currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDate();
    await this.employerService.getByUserLogin().subscribe(async data => {
      this.logins = this.logins.concat(data);
    });
    this.fillMinuteArray();
    await this.reportService.getAllForTime(this.startDate, this.endDate).subscribe(data => {
      this.actions = data;
      this.convertToNormalDate();
      this.waitFlag = false;
    });
  }

}
