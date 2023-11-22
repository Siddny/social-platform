import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConst } from 'src/app/constants/app.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl:string = AppConst.apiPath;

  constructor(private http: HttpClient) {}

  authenticate(usernameOrEmail: string, password: string): Observable<any> {
    const expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    let url = ``;
    if (expression.test(usernameOrEmail)){
      // String is an email
      url = `${this.apiUrl}users?email=${usernameOrEmail}&zipCode=${password}`;
    } else {
      // String is an username
      url = `${this.apiUrl}users?username=${usernameOrEmail}&zipCode=${password}`;
    }
    return this.http.get(url);
  }

  getUserProfile(userId: any): Observable<any> {
    const url = `${this.apiUrl}users?id=${userId}`;
    return this.http.get(url);
  }
}