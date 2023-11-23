import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  postsAuthors: any[] = [];
  paywallVisible = false;
  viewedPosts: Set<number> = new Set<number>();
  
  constructor(
    private postService: PostService,
    public authService: AuthService,
    public sharedService: SharedService,
    ) {}

  ngOnInit() {
    if(this.postService.hasExceededLimit() == false) {
      this.loadPosts();
      this.viewedPosts = this.postService.getViewedPostsSet();
      this.postService.hasExceededLimit();
    } else {
      this.sharedService.refreshPage();
      this.paywallVisible = true;
    }
  }

  loadPosts() {
    this.postService.getPosts().subscribe(
      (posts) => {
        posts.forEach((element: any) => {
          this.postService.getAuthorName(element.userId).subscribe(
            (user) => {
              element['author'] = user[0].name;
            });
        });
        this.posts = posts;
      },
      (error) => {
        console.error('Error fetching posts', error);
      });
  }

  onPostClick(postId: number): void {
    this.postService.incrementViewedPosts(postId);
    this.viewedPosts = this.postService.getViewedPostsSet();
  }

  isPostViewed(postId: number): boolean {
    return this.viewedPosts.has(postId);
  }


}