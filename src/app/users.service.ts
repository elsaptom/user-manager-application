import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = 'https://reqres.in/api/';

  constructor(private http: HttpClient) { }

  getUsers(page: any): Observable<any>{
    const url = this.baseUrl + "users";
    return this.http.get<any>(url, {
      params: {page: page}
    });
  }

  viewUser(id: any): Observable<any>{
    const url = this.baseUrl + "users";
    return this.http.get<any>(url, {
      params: {id: id}
    });
  }

  updateUser(user: any): Observable<any>{
    const url = this.baseUrl + "users";
    return this.http.put<any>(url, 
      {user: user
    });
  }

  deleteUser(id: any): Observable<any>{
    const url = this.baseUrl + "users";
    return this.http.delete<any>(url, {
      params: {id: id}
    });
  }

  createUser(user: any): Observable<any>{
    const url = this.baseUrl + "users";
    return this.http.post<any>(url, user);
  }

}
  
