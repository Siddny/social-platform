import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Post } from '../models';
// import { SharedService } from '../services/shared/shared.service';
import { PostService } from 'src/app/services/post/post.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { PaymentData } from 'src/app/models/app.model';
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

  paymentData: PaymentData = {
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  };
  
  constructor(
    private postService: PostService, 
    private paymentService: PaymentService,
    private sharedService: SharedService,
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

  makePayment(): void {
    this.paymentService.makePayment().subscribe(
      (success) => {
        if (success) {
          this.paywallVisible = false;
          localStorage.setItem('is_premium_member', 'true' );
          // Reload posts after successful payment
          this.loadPosts();
          this.sharedService.refreshPage();
        } else {
          // Handle payment failure
          console.error('Payment failed');
        }
      },
      (error) => {
        console.error('Error making payment', error);
      }
    );
  }
}