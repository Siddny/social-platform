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
    // Assuming username is equivalent to the name field in the JSONPlaceholder API
    return this.http.get(`${this.apiUrl}/users?username=${usernameOrEmail}&email=${usernameOrEmail}&zipCode=${password}`);
  }
}