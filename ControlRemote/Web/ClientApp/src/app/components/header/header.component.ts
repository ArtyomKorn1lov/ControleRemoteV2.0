import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { DialogAuthComponent } from '../dialog-auth/dialog-auth.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public tragetRoute: string = "/";

  constructor(private router: Router, private dialog: MatDialog, public accountService: AccountService) { }

  public openAuthDialog(): void {
    const dialogRef = this.dialog.open(DialogAuthComponent);
  }

  public logOut(): void {
    this.accountService.logOut().subscribe(data => {
      if(data == "success") {
        alert("Успешный выход");
        console.log(data);
        this.router.navigateByUrl(this.tragetRoute);
        return;
      }
      alert("Ошибка выхода");
      console.log(data);
      return;
    });
  }

  ngOnInit(): void {
  }

}
