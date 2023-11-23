import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit{
  usersFollowing: any[] = [];
  usersFollowingPosts: any[] = [];
  isAuthenticated: boolean = false;
  
  constructor(
    public userService: UserService,
    private postService: PostService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = localStorage.getItem('is_authenticated') == 'true' ? true : false;
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
        userObj.posts = posts;
      });
      this.usersFollowingPosts.push(userObj);
    });
  }
}
