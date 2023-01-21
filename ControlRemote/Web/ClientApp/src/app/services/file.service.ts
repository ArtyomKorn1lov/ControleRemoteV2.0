import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PathModel } from '../models/PathModel';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public getImage(path: PathModel): Observable<string> {
    this.tokenService.tokenVerify();
    return this.http.post(`api/file`, path, { responseType: 'text' });
  }

}
