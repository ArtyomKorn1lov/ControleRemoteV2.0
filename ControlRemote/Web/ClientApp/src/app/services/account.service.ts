import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { firstValueFrom, Observable } from "rxjs";
import { LoginModel } from '../models/LoginModel';
import { AuthoriseModel } from '../models/AuthoriseModel';
import { UserModel } from '../models/UserModel';
import { UserCreateModel } from '../models/UserCreateModel';
import { UserUpdateModel } from '../models/UserUpdateModel';
import { AuthenticatedResponse } from '../models/AuthenticatedResponse';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public userFlag: boolean = false;
  public authorize: AuthoriseModel = new AuthoriseModel("", "");
  public currentUrl: string = "/";

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private tokenService: TokenService) { }

  public pushFlag(flag: number): void {
    sessionStorage.setItem('UserFlag', flag.toString());
  }

  public getUserFlag(): number {
    let flag = sessionStorage.getItem('UserFlag');
    if (flag == null) {
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
    if (targetRoute == null) {
      return "";
    }
    return targetRoute;
  }

  public clearParametrs(): void {
    sessionStorage.removeItem('UserId');
    sessionStorage.setItem('UserFlag', "0");
    sessionStorage.removeItem('UserRoute');
  }

  public saveTokens(token: string, refreshToken: string): void {
    localStorage.setItem("jwt", token);
    localStorage.setItem("refreshToken", refreshToken);
  }

  public isAuthorized(): void {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token))
      this.userFlag = true;
    else
      this.userFlag = false;
  }

  public login(user: LoginModel): Observable<AuthenticatedResponse> {
    return this.http.post<AuthenticatedResponse>(`api/account/login`, user, { headers: new HttpHeaders({ "Content-Type": "application/json" }) });
  }

  public logOut(): boolean {
    if(localStorage.getItem("jwt") == null || localStorage.getItem("refreshToken") == null) {
      return false;
    }
    else {
      localStorage.removeItem("jwt");
      localStorage.removeItem("refreshToken");
      this.userFlag = false;
      return true;
    }
  }

  public async getAuthoriseModel(): Promise<void> {
    await this.tokenService.tokenVerify();
    await this.getAuthorizeModel().subscribe({
      next: (data) => {
        if (data != null) {
          this.authorize = data;
          this.userFlag = true;
          return;
        }
        this.authorize = new AuthoriseModel("", "");
        this.userFlag = false;
      },
      error: (bad) => {
        this.authorize = new AuthoriseModel("", "");
        this.userFlag = false;
      }
    });
  }

  public getAuthorizeModel(): Observable<AuthoriseModel> {
    return this.http.get<AuthoriseModel>(`api/account/is-authorized`);
  }

  public getUsers(): Observable<UserModel[]> {
    this.tokenService.tokenVerify();
    return this.http.get<UserModel[]>(`api/account/user-list`);
  }

  public createUser(user: UserCreateModel): Observable<string> {
    this.tokenService.tokenVerify();
    return this.http.post(`api/account/create`, user, { responseType: 'text' });
  }

  public updateUser(user: UserUpdateModel): Observable<string> {
    this.tokenService.tokenVerify();
    return this.http.put(`api/account/update`, user, { responseType: 'text' });
  }

  public deleteUser(id: number): Observable<string> {
    this.tokenService.tokenVerify();
    return this.http.delete(`api/account/remove/${id}`, { responseType: 'text' });
  }

  public getUserById(id: number): Observable<UserModel> {
    this.tokenService.tokenVerify();
    return this.http.get<UserModel>(`api/account/by-id/${id}`);
  }

  public getUserByName(name: string): Observable<UserModel[]> {
    this.tokenService.tokenVerify();
    return this.http.get<UserModel[]>(`api/account/by-name/${name}`);
  }
}
