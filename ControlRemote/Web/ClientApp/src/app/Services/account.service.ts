import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { firstValueFrom, Observable } from "rxjs";
import { LoginModel } from '../Dto/LoginModel';
import { RegisterModel } from '../Dto/RegisterModel';
import { AuthoriseModel } from '../Dto/AuthoriseModel';
import { UserModel } from '../Dto/UserModel';
import { UserCreateModel } from '../Dto/UserCreateModel';
import { UserUpdateModel } from '../Dto/UserUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  public PushFlag(flag: number): void {
    sessionStorage.setItem('UserFlag', flag.toString());
  }

  public GetUserFlag(): number {
    let flag = sessionStorage.getItem('UserFlag');
    if(flag == null) {
      return 0;
    }
    return parseInt(flag);
  }

  public PushUserId(id: number): void {
    sessionStorage.setItem('UserId', id.toString());
  }

  public GetUserId(): number {
    let key = sessionStorage.getItem('UserId');
    if (key == null) {
      return 0;
    }
    return parseInt(key);
  }

  public PushUrl(targetRoute: string): void {
    sessionStorage.setItem('UserRoute', targetRoute);
  }

  public GetUrl(): string {
    let targetRoute = sessionStorage.getItem('UserRoute');
    if(targetRoute == null) {
      return "";
    }
    return targetRoute;
  }

  public ClearParametrs(): void {
    sessionStorage.removeItem('UserId');
    sessionStorage.setItem('UserFlag', "0");
    sessionStorage.removeItem('UserRoute');
  }

  public Registration(user: RegisterModel): Observable<string> {
    return this.http.post(`api/account/register`, user, { responseType: 'text' });
  }

  public Login(user: LoginModel): Observable<string> {
    return this.http.post(`api/account/login`, user, { responseType: 'text' });
  }

  public IsUserAuthorized(): Observable<AuthoriseModel> {
    return this.http.get<AuthoriseModel>(`api/account/is-authorized`);
  }

  public LogOut(): Observable<string> {
    var user = new UserModel(0, "", "");
    return this.http.post(`api/account/logout`, user, { responseType: 'text' });
  }

  public GetUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`api/account/user-list`);
  }

  public CreateUser(user: UserCreateModel): Observable<string> {
    return this.http.post(`api/account/create`, user, { responseType: 'text' });
  }

  public UpdateUser(user: UserUpdateModel): Observable<string> {
    return this.http.put(`api/account/update`, user, { responseType: 'text' });
  }

  public DeleteUser(id: number): Observable<string> {
    return this.http.delete(`api/account/remove/${id}`, { responseType: 'text' });
  }

  public GetUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`api/account/by-id/${id}`);
  }

  public GetUserByName(name: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`api/account/by-name/${name}`);
  }
}
