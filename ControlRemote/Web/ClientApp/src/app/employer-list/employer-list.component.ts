import { Component, OnInit } from '@angular/core';
import { EmployerModel } from '../Dto/EmployerModel';
import { EmployerService } from '../Services/employer.service';
import { AccountService } from '../Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.css']
})
export class EmployerListComponent implements OnInit {

  private targetRoute = "/employer-info";
  public employers: EmployerModel[] = [];
  public name: string = "";

  constructor(private employerService: EmployerService, private accountService: AccountService, private router: Router) { }

  public FindByName(): void {
    this.employerService.GetEmployerByName(this.name).subscribe(data => {
      this.employers = data;
    });
  }

  public GetEmployerInfo(id: number): void {
    this.employerService.PushEmployerId(id);
    this.router.navigateByUrl(this.targetRoute);
  }

  public async ngOnInit(): Promise<void> {
    this.employerService.ClearParametrs();
    this.accountService.ClearParametrs();
    await this.employerService.GetEmployers().subscribe(data => {
      this.employers = data;
    });
  }

}
