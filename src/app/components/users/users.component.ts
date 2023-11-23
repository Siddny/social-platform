import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  allUsers: any[] = [];
  isAuthenticated: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.allUsers = users.map((user) => ({ ...user, isFollowing: false }));
    });
    this.isAuthenticated = localStorage.getItem('is_authenticated') == 'true' ? true : false;
  }

  followUser(userId: number): void {
    this.userService.followUser(userId);
  }

  unfollowUser(userId: number): void {
    this.userService.unfollowUser(userId);
  }

  toggleFollow(userId: number): void {
    console.log(this.userService.isFollowing(userId));
    if (this.isAuthenticated) {
      if (this.userService.isFollowing(userId)) {
        this.userService.unfollowUser(userId);
      } else {
        this.userService.followUser(userId);
      }
    } else {
      // Handle the case where the user is not authenticated
      // You might want to show a login prompt or redirect to a login page
      console.log('User not authenticated. Show login prompt or redirect to login page.');
    }
  }

  getButtonColor(userId: number): string {
    return this.userService.isFollowing(userId) ? 'warn' : 'primary';
  }

  getButtonText(userId: number): string {
    return this.userService.isFollowing(userId) ? 'Unfollow' : 'Follow';
  }
}
