import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { EmployerService } from 'src/app/services/employer.service';
import { UserModel } from 'src/app/models/UserModel';
import { EmployerModel } from 'src/app/models/EmployerModel';
import { DialogSearchComponent } from 'src/app/components/dialog-search/dialog-search.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogRegComponent } from 'src/app/components/dialog-reg/dialog-reg.component';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css']
})
export class UserControlComponent implements OnInit {

  public users: UserModel[] = [];
  public employers: EmployerModel[] = [];
  public userIndex: number | undefined;
  public employerIndex: number | undefined;

  constructor(private accountService: AccountService, private router: Router, private employerService: EmployerService, private dialog: MatDialog, private route: ActivatedRoute) { }

  public setUserIndex(index: number): void {
    this.userIndex = index;
  }

  public setEmployerIndex(index: number): void {
    this.employerIndex = index;
  }

  public async openSearchUserDialog(): Promise<void> {
    const dialogRef = this.dialog.open(DialogSearchComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined)
        await this.searchUser(result.searchName);
    });
  }

  public async searchUser(name: string): Promise<void> {
    await this.accountService.getUserByName(name).subscribe(data => {
      this.users = data;
    });
  }

  public openSearchEmployerDialog(): void {
    const dialogRef = this.dialog.open(DialogSearchComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined)
        await this.searchEmployer(result.searchName);
    });
  }

  public async searchEmployer(name: string): Promise<void> {
    await this.employerService.getEmployerByName(name).subscribe(data => {
      this.employers = data;
    });
  }

  public async createUser(): Promise<void> {
    const dialogRef = this.dialog.open(DialogRegComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined)
        await this.accountService.getUsers().subscribe(data => {
          this.users = data;
        });
    });
  }

  public async removeUser(): Promise<void> {
    let ok = confirm("Удалить текущую запись?");
    if(this.userIndex == undefined)
      return;
    if(ok) {
      const id =  this.users[this.userIndex].id;
      await this.accountService.deleteUser(id).subscribe(data => {
        if(data == "success") {
          alert(data);
          console.log(data);
          return;
        }
        alert("Ошибка удаления");
        console.log(data);
        return;
      })
    }
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.getAuthorizeModel(this.router.url);
    await this.accountService.getUsers().subscribe(data => {
      this.users = data;
    });
    await this.employerService.getEmployers().subscribe(data => {
      this.employers = data;
    });
  }

}
