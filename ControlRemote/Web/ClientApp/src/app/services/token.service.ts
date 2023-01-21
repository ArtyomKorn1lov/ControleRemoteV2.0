import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticatedResponse } from '../models/AuthenticatedResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  public async tokenVerify(): Promise<boolean> {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    if (token == null) {
      return false;
    }
    const isRefresh = await this.tryRefreshingTokens(token);
    return isRefresh;
  }

  private async tryRefreshingTokens(token: string): Promise<boolean> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!token || !refreshToken) {
      return false;
    }
    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
    let isRefreshSuccess: boolean;
    const refreshRes = await new Promise<AuthenticatedResponse>((resolve, reject) => {
      this.http.post<AuthenticatedResponse>(`api/token/refresh`, credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe({
        next: (res: AuthenticatedResponse) => resolve(res),
        error: (_) => { reject; isRefreshSuccess = false; }
      });
    });
    localStorage.setItem("jwt", refreshRes.token);
    localStorage.setItem("refreshToken", refreshRes.refreshToken);
    isRefreshSuccess = true;
    return isRefreshSuccess;
  }

}
