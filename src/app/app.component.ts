import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SocialPlatform';
  isAuthenticated = false;
  showScrollToTop = false;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showScrollToTop = false;
      }
    });
  }

  ngOnInit() {
    this.authService.initializeAuthenticationState();
    // Subscribe to authentication changes
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      setTimeout(() => {
        this.isAuthenticated = isAuthenticated;
      });
    });
  }

  // scrollToTop(): void {
  //   console.log('sfsdfsdjlkdjglkdf');
  //   document.body.scrollTop = 0;
  //   document.documentElement.scrollTop = 0;
  // }

  // @HostListener('window:scroll', [])
  // onWindowScroll(): void {
  //   this.showScrollToTop = window.scrollY > 100;
  // }

  public showScrollButton: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
