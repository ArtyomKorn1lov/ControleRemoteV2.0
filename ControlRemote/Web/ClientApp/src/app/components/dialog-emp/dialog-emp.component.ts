import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployerService } from 'src/app/services/employer.service';
import { EmployerCreateModel } from 'src/app/models/EmployerCreateModel';
import { NoticeDialogComponent } from '../notice-dialog/notice-dialog.component';

@Component({
  selector: 'app-dialog-emp',
  templateUrl: './dialog-emp.component.html',
  styleUrls: ['./dialog-emp.component.css']
})
export class DialogEmpComponent implements OnInit {

  public name: string = "";
  public login: string = "";
  private managerId: number | undefined;

  constructor(private employerService: EmployerService, private dialog: MatDialog, private dialogRef: MatDialogRef<DialogEmpComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public close(): void {
    this.dialogRef.close();
  }

  public async create(): Promise<void> {
    if (this.name == undefined || this.name.trim() == '') {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Введите имя сотрудника" } });
      this.name = '';
      return;
    }
    if (this.login == undefined || this.login.trim() == '') {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Введите домен/логин сотрудника" } });
      this.login = '';
      return;
    }
    if (this.managerId == undefined) {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Не выбран руководитель" } });
      return;
    }
    const employer = new EmployerCreateModel(this.managerId, this.name, this.login);
    await this.employerService.createEmployer(employer).subscribe({
      next: (data) => {
        console.log(data);
        this.dialogRef.close({ result: "1" });
        return;
      },
      error: (bad) => {
        const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Ошибка создания сотрудника" } });
        console.log(bad);
        this.name = '';
        this.login = '';
        return;
      },
    });
  }

  public ngOnInit(): void {
    this.managerId = this.data.id;
  }

}
