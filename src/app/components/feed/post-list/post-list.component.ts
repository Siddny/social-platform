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
  postsWithAds: any[] = [];
  paywallVisible = false;
  viewedPosts: Set<number> = new Set<number>();
  isAuthenticated = false;
  
  constructor(
    private postService: PostService,
    public authService: AuthService,
    public sharedService: SharedService,
    ) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

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
      (posts: any[]) => {
        posts.forEach((element: any) => {
          this.postService.getAuthorName(element.userId).subscribe(
            (user) => {
              element['author'] = user[0].name;
            });
        });
        this.posts = posts;
        this.createPostsWithAds();
      },
      (error: any) => {
        console.error('Error fetching posts', error);
      });
  }

  createPostsWithAds(): void {
    // Insert ads after every five posts
    this.postsWithAds = this.posts.reduce((acc, post, index) => {
      acc.push(post);
      if ((index + 1) % 5 === 0) {
        acc.push({ ad: true });
      }
      return acc;
    }, []);
  }

  onPostClick(postId: number): void {
    this.postService.incrementViewedPosts(postId);
    this.viewedPosts = this.postService.getViewedPostsSet();
  }

  isPostViewed(postId: number): boolean {
    return this.viewedPosts.has(postId);
  }

  toggleBlockPost(postId: number): void {
    if (this.authService.isAuthenticated()) {
      this.postService.blockPost(postId);
    }
  }

  getBlockButtonColor(userId: number): string {
    return this.postService.isPostBlocked(userId) ? 'primary' : 'warn';
  }

  getBlockButtonText(userId: number): string {
    return this.postService.isPostBlocked(userId) ? 'Unblock' : 'Block';
  }

}