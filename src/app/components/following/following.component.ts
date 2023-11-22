import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit{
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users.map((user) => ({ ...user, isFollowing: false }));
    });
  }

  followUser(userId: number): void {
    this.userService.followUser(userId).subscribe(() => {
      this.users.find((user) => user.id === userId).isFollowing = true;
    });
  }

  unfollowUser(userId: number): void {
    this.userService.unfollowUser(userId).subscribe(() => {
      this.users.find((user) => user.id === userId).isFollowing = false;
    });
  }
}
