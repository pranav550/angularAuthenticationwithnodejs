import { Auth } from './../class/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL= 'http://localhost:3000/api/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  registerUser(body): Observable<Auth>{
    return this.http.post<Auth>(`${URL}/register`, body)
  }

  loginUser(body): Observable<Auth>{
    return this.http.post<Auth>(`${URL}/login`, body)
  }

  getUsers():Observable<any>{
     return this.http.get(`${URL}/get-all-users`);
  }
}
