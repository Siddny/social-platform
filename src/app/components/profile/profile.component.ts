import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: any;

  constructor(private authService: AuthService,) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userId = localStorage.getItem('user_id');
    this.authService.getUserProfile(userId).subscribe(
      (userProfile: any) => {
        this.userProfile = userProfile[0];
      },
      (error: any) => {
        console.error('Error fetching user profile', error);
      }
    );
  }
}
