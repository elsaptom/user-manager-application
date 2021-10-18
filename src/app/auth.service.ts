import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://reqres.in/api/';

  constructor(private http: HttpClient) { }

  login(userInfo: any): Observable<Token>{
    const url = this.baseUrl + "login";
    return this.http.post<any>(url, userInfo);
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;

  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
