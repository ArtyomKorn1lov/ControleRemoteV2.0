import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PathModel } from '../models/PathModel';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  public getImage(path: PathModel): Observable<string> {
    return this.http.post(`api/file`, path, { responseType: 'text' });
  }

}
