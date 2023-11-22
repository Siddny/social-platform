import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Post } from '../models';
// import { SharedService } from '../services/shared/shared.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  paywallVisible = false;
  viewedPosts: Set<number> = new Set<number>();

  constructor(
    private postService: PostService, 
  ) {}

  ngOnInit() {
    
    if(this.postService.hasExceededLimit() == false) {
      this.loadPosts();
      this.viewedPosts = this.postService.getViewedPostsSet();
      this.postService.hasExceededLimit();
      console.log('Viewed Posts:', this.postService.getViewedPosts());
      console.log('Exceeded Limit:', this.postService.hasExceededLimit());
    } else {
      this.paywallVisible = true;
    }
  }

  loadPosts() {
    this.postService.getPosts().subscribe(
      (posts) => {
        this.posts = posts;
      },
      (error) => {
        console.error('Error fetching posts', error);
      }
    );
  }

  onPostClick(postId: number): void {
    this.postService.incrementViewedPosts(postId);
    this.viewedPosts = this.postService.getViewedPostsSet();
  }

  isPostViewed(postId: number): boolean {
    return this.viewedPosts.has(postId);
  }
}