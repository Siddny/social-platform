import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConst } from 'src/app/constants/app.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl:string = AppConst.apiPath;
  private isPremiumMember: boolean = false;
  private isUserAuthenticated: boolean = false;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadPremiumStatus();
    this.loadAuthenticatedStatus();
  }

  private loadPremiumStatus(): void {
    this.isPremiumMember = localStorage.getItem('is_premium_member') == 'true' ? true: false;
  }

  getMemberStatus(): boolean {
    return localStorage.getItem('is_premium_member') == 'true' ? true: false;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('is_authenticated') == 'true' ? true: false;
  }

  private loadAuthenticatedStatus(): void {
    this.isUserAuthenticated = localStorage.getItem('is_authenticated') == 'true' ? true: false;
  }

  onLogin() {
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('isAuthenticated', true.toString());
  }
  onLogout() {
    this.isAuthenticatedSubject.next(false);
    localStorage.setItem('isAuthenticated', false.toString());
  }
  initializeAuthenticationState(): void {
    const storedValue = localStorage.getItem('isAuthenticated');
    const initialValue = storedValue ? JSON.parse(storedValue) : false;
    this.isAuthenticatedSubject.next(initialValue);
  }

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