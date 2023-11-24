import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SocialPlatform';
  isAuthenticated = false;

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.initializeAuthenticationState();
    // Subscribe to authentication changes
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
        setTimeout(() => {
          this.isAuthenticated = isAuthenticated;
        });
    });
  }
}
