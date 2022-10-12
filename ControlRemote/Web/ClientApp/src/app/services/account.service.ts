import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { firstValueFrom, Observable } from "rxjs";
import { LoginModel } from '../models/LoginModel';
import { RegisterModel } from '../models/RegisterModel';
import { AuthoriseModel } from '../models/AuthoriseModel';
import { UserModel } from '../models/UserModel';
import { UserCreateModel } from '../models/UserCreateModel';
import { UserUpdateModel } from '../models/UserUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public userFlag: boolean = false;
  public authorize: AuthoriseModel = new AuthoriseModel ("", "");
  public currentUrl: string = "/";

  constructor(private http: HttpClient) { }

  public pushFlag(flag: number): void {
    sessionStorage.setItem('UserFlag', flag.toString());
  }

  public getUserFlag(): number {
    let flag = sessionStorage.getItem('UserFlag');
    if(flag == null) {
      return 0;
    }
    return parseInt(flag);
  }

  public pushUserId(id: number): void {
    sessionStorage.setItem('UserId', id.toString());
  }

  public getUserId(): number {
    let key = sessionStorage.getItem('UserId');
    if (key == null) {
      return 0;
    }
    return parseInt(key);
  }

  public pushUrl(targetRoute: string): void {
    sessionStorage.setItem('UserRoute', targetRoute);
  }

  public getUrl(): string {
    let targetRoute = sessionStorage.getItem('UserRoute');
    if(targetRoute == null) {
      return "";
    }
    return targetRoute;
  }

  public clearParametrs(): void {
    sessionStorage.removeItem('UserId');
    sessionStorage.setItem('UserFlag', "0");
    sessionStorage.removeItem('UserRoute');
  }

  public async getAuthorizeModel(href: string): Promise<void> {
    this.currentUrl = href;
    await this.isUserAuthorized().subscribe(data => {
      this.authorize = data;
      if(data.name != null || data.type != null)
      {
        this.userFlag = true;
        return;
      }
      this.userFlag = false;
    })
  }

  public registration(user: RegisterModel): Observable<string> {
    return this.http.post(`api/account/register`, user, { responseType: 'text' });
  }

  public login(user: LoginModel): Observable<string> {
    return this.http.post(`api/account/login`, user, { responseType: 'text' });
  }

  public isUserAuthorized(): Observable<AuthoriseModel> {
    return this.http.get<AuthoriseModel>(`api/account/is-authorized`);
  }

  public logOut(): Observable<string> {
    var user = new UserModel(0, "", "");
    return this.http.post(`api/account/logout`, user, { responseType: 'text' });
  }

  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`api/account/user-list`);
  }

  public createUser(user: UserCreateModel): Observable<string> {
    return this.http.post(`api/account/create`, user, { responseType: 'text' });
  }

  public updateUser(user: UserUpdateModel): Observable<string> {
    return this.http.put(`api/account/update`, user, { responseType: 'text' });
  }

  public deleteUser(id: number): Observable<string> {
    return this.http.delete(`api/account/remove/${id}`, { responseType: 'text' });
  }

  public getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`api/account/by-id/${id}`);
  }

  public getUserByName(name: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`api/account/by-name/${name}`);
  }
}