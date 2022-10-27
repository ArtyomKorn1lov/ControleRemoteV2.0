import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployerModel } from 'src/app/models/EmployerModel';
import { EmployerService } from 'src/app/services/employer.service';
import { NoticeDialogComponent } from '../notice-dialog/notice-dialog.component';

@Component({
  selector: 'app-dialog-emp-update',
  templateUrl: './dialog-emp-update.component.html',
  styleUrls: ['./dialog-emp-update.component.css']
})
export class DialogEmpUpdateComponent implements OnInit {

  public employer: EmployerModel = new EmployerModel(0, 0, "", "");

  constructor(private employerService: EmployerService, private dialog: MatDialog, private dialogRef: MatDialogRef<DialogEmpUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public async update(): Promise<void> {
    if (this.employer.name == undefined || this.employer.name.trim() == '') {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Введите имя сотрудника" } });
      this.employer.name = '';
      return;
    }
    if (this.employer.login == undefined || this.employer.login.trim() == '') {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Введите домен/логин сотрудника" } });
      this.employer.login = '';
      return;
    }
    if (this.employer.managerId == undefined) {
      const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Не выбран руководитель" } });
      return;
    }
    await this.employerService.updateEmployer(this.employer).subscribe({
      next: (data) => {
        const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Успешно" } });
        console.log(data);
        this.dialogRef.close({ result: "1" });
        return;
      },
      error: (bad) => {
        const aletDialog = this.dialog.open(NoticeDialogComponent, { data: { message: "Ошибка обновления сотрудника" } });
        console.log(bad);
        this.employer.name = '';
        this.employer.login = '';
        return;
      },
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.employerService.getEmployerById(this.data.id).subscribe(data => {
      this.employer = data;
    });
  }

}
