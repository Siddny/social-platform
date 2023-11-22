import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usernameOrEmail: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.authenticate(this.usernameOrEmail, this.password).subscribe(
      (response) => {
        console.log('Authentication successful', response);
        // Handle successful login, e.g., store token in local storage
      },
      (error) => {
        console.error('Authentication failed', error);
        // Handle failed login
      }
    );
  }
}
