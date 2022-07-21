import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployerModel } from '../Dto/EmployerModel';
import { EmployerCreateModel } from '../Dto/EmployerCreateModel';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private http: HttpClient) { }

  public PushEmployerId(id: number): void {
    sessionStorage.setItem("EmployerId", id.toString());
  }

  public GetEmployerId(): number {
    let key = sessionStorage.getItem("EmployerId");
    if(key == null) {
      return 0;
    }
    return parseInt(key);
  }

  public SaveParametrs(name: string, login: string): void {
    sessionStorage.setItem("EmployerName", name);
    sessionStorage.setItem("EmployerLogin", login);
  }

  public GetEmployerName(): string {
    let name = sessionStorage.getItem("EmployerName");
    if(name == null) {
      return "";
    }
    return name;
  }

  public GetEmployerLogin(): string {
    let login = sessionStorage.getItem("EmployerLogin");
    if(login == null) {
      return "";
    }
    return login;
  }

  public ClearParametrs(): void {
    sessionStorage.removeItem("EmployerName");
    sessionStorage.removeItem("EmployerLogin");
  }

  public GetEmployers(): Observable<EmployerModel[]> {
    return this.http.get<EmployerModel[]>(`api/employer/employer-list`);
  }

  public GetEmployerById(id: number): Observable<EmployerModel> {
    return this.http.get<EmployerModel>(`api/employer/by-id/${id}`);
  }

  public GetEmployerByName(name: string): Observable<EmployerModel[]> {
    return this.http.get<EmployerModel[]>(`api/employer/by-name/${name}`);
  }

  public CreateEmployer(employer: EmployerCreateModel): Observable<string> {
    return this.http.post(`api/employer/create`, employer, { responseType: 'text' });
  }

  public UpdateEmployer(employer: EmployerModel): Observable<string> {
    return this.http.put(`api/employer/update`, employer, { responseType: 'text' });
  }

  public RemoveEmployer(id: number): Observable<string> {
    return this.http.delete(`api/employer/remove/${id}`, { responseType: 'text' });
  }

  public GetByUserLogin(): Observable<string[]> {
    return this.http.get<string[]>(`api/employer/by-user-login`);
  }

}
