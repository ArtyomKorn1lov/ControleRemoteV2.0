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
import { DialogRegUpdateComponent } from 'src/app/components/dialog-reg-update/dialog-reg-update.component';
import { DialogEmpComponent } from 'src/app/components/dialog-emp/dialog-emp.component';
import { DialogEmpUpdateComponent } from 'src/app/components/dialog-emp-update/dialog-emp-update.component';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { NoticeDialogComponent } from 'src/app/components/notice-dialog/notice-dialog.component';

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

  public async setUserIndex(index: number): Promise<void> {
    this.userIndex = index;
    const id = this.users[this.userIndex].id;
    await this.employerService.getEmployersByManagerId(id).subscribe(data => {
      this.employers = data;
    });
  }

  public setEmployerIndex(index: number): void {
    this.employerIndex = index;
  }

  public async openSearchUserDialog(): Promise<void> {
    const dialogRef = this.dialog.open(DialogSearchComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if (result == undefined)
        return;
      if (result.searchName != '')
        await this.searchUser(result.searchName);
      await this.ngOnInit();
    });
  }

  public async searchUser(name: string): Promise<void> {
    await this.accountService.getUserByName(name).subscribe(data => {
      this.users = data;
    });
  }

  public openSearchEmployerDialog(): void {
    if (this.userIndex == undefined)
      return;
    const dialogRef = this.dialog.open(DialogSearchComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if (result == undefined)
        return;
      if (result.searchName != '')
        await this.searchEmployer(result.searchName);
      await this.ngOnInit();
    });
  }

  public async searchEmployer(name: string): Promise<void> {
    if (this.userIndex == undefined)
      return;
    const id = this.users[this.userIndex].id;
    await this.employerService.getEmployerByName(name, id).subscribe(data => {
      this.employers = data;
    });
  }

  public async createUser(): Promise<void> {
    const dialogRef = this.dialog.open(DialogRegComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined)
        await this.accountService.getUsers().subscribe(async data => {
          this.users = data;
        });
    });
  }

  public async removeUser(): Promise<void> {
    if (this.userIndex == undefined)
      return;
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if (this.userIndex == undefined)
        return;
      if (result.flag) {
        const id = this.users[this.userIndex].id;
        await this.accountService.deleteUser(id).subscribe({
          next: async (data) => {
            console.log(data);
            await this.ngOnInit();
            this.employers = [];
            return;
          },
          error: (bad) => {
            const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Ошибка удаления" } });
            console.log(bad);
            return;
          }
        });
      }
      return;
    });
  }

  public async updateUser(): Promise<void> {
    if (this.userIndex == undefined)
      return;
    const id = this.users[this.userIndex].id;
    const dialogRef = this.dialog.open(DialogRegUpdateComponent, { data: { id: id } });
    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined)
        await this.accountService.getUsers().subscribe(async data => {
          this.users = data;
        });
    });
  }

  public async createEmployer(): Promise<void> {
    if (this.userIndex == undefined) {
      return;
    }
    const id = this.users[this.userIndex].id;
    const dialogRef = this.dialog.open(DialogEmpComponent, { data: { id: id } });
    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined) {
        await this.employerService.getEmployersByManagerId(id).subscribe(data => {
          this.employers = data;
        });
      }
    });
  }

  public async removeEmployer(): Promise<void> {
    if (this.employerIndex == undefined || this.userIndex == undefined)
      return;
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if (this.employerIndex == undefined || this.userIndex == undefined)
        return;
      if (result.flag) {
        const id = this.employers[this.employerIndex].id;
        const managerId = this.users[this.userIndex].id;
        await this.employerService.removeEmployer(id).subscribe({
          next: async (data) => {
            console.log(data);
            await this.employerService.getEmployersByManagerId(managerId).subscribe(data => {
              this.employers = data;
            });
            return;
          },
          error: (bad) => {
            const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Ошибка удаления" } });
            console.log(bad);
            return;
          },
        });
      }
      return;
    });
  }

  public async updateEmployer(): Promise<void> {
    if (this.userIndex == undefined) {
      return;
    }
    if (this.employerIndex == undefined) {
      return;
    }
    const id = this.employers[this.employerIndex].id;
    const managerId = this.users[this.userIndex].id;
    const dialogRef = this.dialog.open(DialogEmpUpdateComponent, { data: { id: id } });
    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined) {
        await this.employerService.getEmployersByManagerId(managerId).subscribe(data => {
          this.employers = data;
        });
      }
    });
  }

  public async ngOnInit(): Promise<void> {
    this.accountService.currentUrl = this.router.url;
    this.accountService.getAuthoriseModel();
    await this.accountService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

}
