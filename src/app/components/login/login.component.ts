import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usernameOrEmail: string = '';
  password: string = '';
  currentUrl: string = ''; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.currentUrl = this.router.url;
    if(this.currentUrl == '/feeds') {
      this.sharedService.refreshPage();
    }
    this.logout();
  }

  login() {
    this.authService.authenticate(this.usernameOrEmail, this.password).subscribe(
      (response) => {
        this.quickCheck(response[0].id);
        localStorage.setItem('username', response[0].username);
        localStorage.setItem('user_id', response[0].id);
        localStorage.setItem('is_authenticated', 'true');
        this.router.navigate(['/feeds']);
        this.currentUrl = this.router.url;
        if(this.currentUrl == '/feeds') {
          this.sharedService.refreshPage();
        }
      });
  }

  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('is_authenticated');
    // localStorage.removeItem('viewedPosts');
    // localStorage.clear();
    // this.router.navigate(['/login']);
  }

  quickCheck(user_id: string) {
    if (localStorage.getItem('user_id') && localStorage.getItem('user_id') != user_id) {
      console.log('Clear all items');
      localStorage.clear();
    }
  }
}
