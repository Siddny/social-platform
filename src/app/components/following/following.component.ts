import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  usersFollowing: any[] = [];
  usersFollowingPosts: any[] = [];
  isAuthenticated: boolean = false;

  constructor(
    public userService: UserService,
    public postService: PostService,
    public authService: AuthService,
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.usersFollowing = Array.from(this.userService.userFollowPostUnblocked());

    this.usersFollowing.forEach(element => {
      let userObj = {
        user: {},
        posts: []
      }
      // get user profile
      this.authService.getUserProfile(element).subscribe((userProfile: any) => {
        userObj.user = userProfile[0];
      });

      // get user posts
      this.postService.getMyPosts(element).subscribe((posts) => {
        // const blockedPosts = Array.from(this.postService.getBlockedPosts());
        // const array3 = posts.filter((item2: any) => !blockedPosts.some(item1 => item1 === item2.id));
        // console.log(array3);
        userObj.posts = posts;
      });
      this.usersFollowingPosts.push(userObj);
    });
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
  
  blockPost(postId: number): void {
    if (this.isAuthenticated) {
      this.postService.blockPost(postId);
    }
  }
}
