import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthService {
  authToken: any;
  user: any

  constructor(private http:HttpClient
    ){}

  registerUser(user: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers }).pipe(map((res: any) => res));
  }

  authenticateUser(user: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers }).pipe(map((res: any) => res));
  }

  getProfile() {
    this.loadToken()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('http://localhost:3000/users/profile', { headers }).pipe(map((res: any) => res));
    
  }

  storeUserData(token: any, user: any){
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
  }

  loadToken(){
    const token = localStorage.getItem('id_token')
    this.authToken = token
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('id_token')
    return !!token; // Returns true if the token exists, false otherwise
  }

  logout(){
    this.authToken = null
    this.user = null
    localStorage.clear()
  }


}
