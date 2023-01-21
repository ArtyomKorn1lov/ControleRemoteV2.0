import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionSortByUserLoginModel } from '../models/ActionSortByUserLoginModel';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public getAllForTime(start: string, final: string): Observable<ActionSortByUserLoginModel[]> {
    this.tokenService.tokenVerify();
    return this.http.get<ActionSortByUserLoginModel[]>(`api/report/report-list/${start}/${final}`);
  }

  public getByLoginForTime(login: string, start: string, final: string): Observable<ActionSortByUserLoginModel[]> {
    this.tokenService.tokenVerify();
    return this.http.get<ActionSortByUserLoginModel[]>(`api/report/report-list/${login}/${start}/${final}`);
  }
}
