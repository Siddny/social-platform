import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/app.model';
import { PostService } from 'src/app/services/post/post.service';
// import { Post } from '../models';
// import { PostViewService } from '../services/post/post-view.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.getPostDetail();
  }

  getPostDetail(){
    const postId = this.route.snapshot.paramMap.get('id');
    this.postService.getPostDetails(postId).subscribe(post => {
      this.post = post;
    })
  }

  goBack() {
    this.router.navigate(['/']);
  }
}