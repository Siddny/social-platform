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
    if (this.isAuthenticated) {
      if (this.userService.isFollowing(userId)) {
        this.userService.unfollowUser(userId);
      } else {
        this.userService.followUser(userId);
      }
    }
  }

  getButtonColor(userId: number): string {
    return this.userService.isFollowing(userId) ? 'accent' : 'primary';
  }

  getButtonText(userId: number): string {
    return this.userService.isFollowing(userId) ? 'Unfollow' : 'Follow';
  }

  toggleBlock(userId: number): void {
    if (this.isAuthenticated) {
      if (this.userService.isBlocked(userId)) {
        this.userService.unBlockUser(userId);
      } else {
        this.userService.blockUser(userId);
      }
    }
  }

  getBlockButtonColor(userId: number): string {
    return this.userService.isBlocked(userId) ? 'primary' : 'warn';
  }

  getBlockButtonText(userId: number): string {
    return this.userService.isBlocked(userId) ? 'Unblock' : 'Block';
  }
}
