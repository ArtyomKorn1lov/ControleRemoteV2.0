import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionSortByUserLoginModel } from '../models/ActionSortByUserLoginModel';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  public getAllForTime(start: string, final: string): Observable<ActionSortByUserLoginModel[]> {
    return this.http.get<ActionSortByUserLoginModel[]>(`api/report/report-list/${start}/${final}`);
  }

  public getByLoginForTime(login: string, start: string, final: string): Observable<ActionSortByUserLoginModel[]> {
    return this.http.get<ActionSortByUserLoginModel[]>(`api/report/report-list/${login}/${start}/${final}`);
  }
}
