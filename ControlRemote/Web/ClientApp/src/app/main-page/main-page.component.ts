import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegComponent } from '../dialog-reg/dialog-reg.component';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public id: number | undefined;
  public name: string | undefined;

  constructor(public dialog: MatDialog, private accountService: AccountService) { }

  public openRegDialog(): void {
    const dialogRef = this.dialog.open(DialogRegComponent);
  }

  public LogOut(): void {
    this.accountService.LogOut().subscribe(data => {
      if(data == "success") {
        alert("Успешный выход");
        console.log(data);
        location.reload();
        return;
      }
      alert("Ошибка выхода");
      console.log(data);
      return;
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.IsUserAuthorized().subscribe(data => {
      this.name = data.name;
    });
  }

}
