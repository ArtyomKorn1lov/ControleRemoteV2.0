import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { DialogAuthComponent } from './components/dialog-auth/dialog-auth.component';
import { DialogRegComponent } from './components/dialog-reg/dialog-reg.component';
import { DialogEmpComponent } from './components/dialog-emp/dialog-emp.component';
import { UserControlComponent } from './pages/user-control/user-control.component';
import { RequestActionComponent } from './pages/request-action/request-action.component';
import { DialogSearchComponent } from './components/dialog-search/dialog-search.component';
import { DialogRegUpdateComponent } from './components/dialog-reg-update/dialog-reg-update.component';
import { DialogEmpUpdateComponent } from './components/dialog-emp-update/dialog-emp-update.component';
import { AuthGuard } from './guards/auth.guards';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { NoticeDialogComponent } from './components/notice-dialog/notice-dialog.component';
import { DialogImageComponent } from './components/dialog-image/dialog-image.component';

export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    DialogAuthComponent,
    DialogRegComponent,
    DialogEmpComponent,
    UserControlComponent,
    RequestActionComponent,
    DialogSearchComponent,
    DialogRegUpdateComponent,
    DialogEmpUpdateComponent,
    DeleteDialogComponent,
    NoticeDialogComponent,
    DialogImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [],
        disallowedRoutes: []
      }
    }),
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent },
      { path: 'user-control', component: UserControlComponent, canActivate: [AuthGuard] },
      { path: 'request-action', component: RequestActionComponent, canActivate: [AuthGuard] }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
//canActivate: [AuthGuard]
export class AppModule { }
