import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployerService } from 'src/app/services/employer.service';
import { EmployerCreateModel } from 'src/app/models/EmployerCreateModel';

@Component({
  selector: 'app-dialog-emp',
  templateUrl: './dialog-emp.component.html',
  styleUrls: ['./dialog-emp.component.css']
})
export class DialogEmpComponent implements OnInit {

  public name: string = "";
  public login: string = "";
  private managerId: number | undefined;

  constructor(private employerService: EmployerService, private dialogRef: MatDialogRef<DialogEmpComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public async create(): Promise<void> {
    if (this.name == undefined || this.name.trim() == '') {
      alert("Введите имя сотрудника");
      this.name = '';
      return;
    }
    if (this.login == undefined || this.login.trim() == '') {
      alert("Введите домен/логин сотрудника");
      this.login = '';
      return;
    }
    if (this.managerId == undefined) {
      alert("Не выбран руководитель");
      return;
    }
    const employer = new EmployerCreateModel(this.managerId, this.name, this.login);
    await this.employerService.createEmployer(employer).subscribe(data => {
      if(data == "success") {
        alert(data);
        console.log(data);
        this.dialogRef.close({result: "1"});
        return;
      }
      alert("Ошибка создания сотрудника");
      console.log(data);
      this.name = '';
      this.login = '';
      return;
    })
  }

  public ngOnInit(): void {
    this.managerId = this.data.id;
  }

}
