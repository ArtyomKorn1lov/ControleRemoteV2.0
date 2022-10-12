import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployerModel } from '../models/EmployerModel';
import { EmployerCreateModel } from '../models/EmployerCreateModel';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private http: HttpClient) { }

  public pushEmployerId(id: number): void {
    sessionStorage.setItem("EmployerId", id.toString());
  }

  public getEmployerId(): number {
    let key = sessionStorage.getItem("EmployerId");
    if(key == null) {
      return 0;
    }
    return parseInt(key);
  }

  public saveParametrs(name: string, login: string): void {
    sessionStorage.setItem("EmployerName", name);
    sessionStorage.setItem("EmployerLogin", login);
  }

  public getEmployerName(): string {
    let name = sessionStorage.getItem("EmployerName");
    if(name == null) {
      return "";
    }
    return name;
  }

  public getEmployerLogin(): string {
    let login = sessionStorage.getItem("EmployerLogin");
    if(login == null) {
      return "";
    }
    return login;
  }

  public clearParametrs(): void {
    sessionStorage.removeItem("EmployerName");
    sessionStorage.removeItem("EmployerLogin");
  }

  public getEmployers(): Observable<EmployerModel[]> {
    return this.http.get<EmployerModel[]>(`api/employer/employer-list`);
  }

  public getEmployerById(id: number): Observable<EmployerModel> {
    return this.http.get<EmployerModel>(`api/employer/by-id/${id}`);
  }

  public getEmployerByName(name: string): Observable<EmployerModel[]> {
    return this.http.get<EmployerModel[]>(`api/employer/by-name/${name}`);
  }

  public createEmployer(employer: EmployerCreateModel): Observable<string> {
    return this.http.post(`api/employer/create`, employer, { responseType: 'text' });
  }

  public updateEmployer(employer: EmployerModel): Observable<string> {
    return this.http.put(`api/employer/update`, employer, { responseType: 'text' });
  }

  public removeEmployer(id: number): Observable<string> {
    return this.http.delete(`api/employer/remove/${id}`, { responseType: 'text' });
  }

  public getByUserLogin(): Observable<string[]> {
    return this.http.get<string[]>(`api/employer/by-user-login`);
  }

}
