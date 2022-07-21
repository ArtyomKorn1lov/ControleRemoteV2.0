import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAuthComponent } from './dialog-auth/dialog-auth.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DialogRegComponent } from './dialog-reg/dialog-reg.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { EmployerCreateComponent } from './employer-create/employer-create.component';
import { EmployerCreateUsersComponent } from './employer-create-users/employer-create-users.component';
import { EmployerInfoComponent } from './employer-info/employer-info.component';
import { EmployerUpdateComponent } from './employer-update/employer-update.component';
import { ReportListComponent } from './report-list/report-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    DialogAuthComponent,
    DialogRegComponent,
    UserListComponent,
    UserCreateComponent,
    UserInfoComponent,
    UserUpdateComponent,
    EmployerListComponent,
    EmployerCreateComponent,
    EmployerCreateUsersComponent,
    EmployerInfoComponent,
    EmployerUpdateComponent,
    ReportListComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: MainPageComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'user-create', component: UserCreateComponent },
      { path: 'user-info', component: UserInfoComponent },
      { path: 'user-update', component: UserUpdateComponent },
      { path: 'employer-list', component: EmployerListComponent },
      { path: 'employer-create', component: EmployerCreateComponent },
      { path: 'employer-create-users', component: EmployerCreateUsersComponent },
      { path: 'employer-info', component: EmployerInfoComponent },
      { path: 'employer-update', component: EmployerUpdateComponent },
      { path: 'report-list', component: ReportListComponent },
    ]),
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
