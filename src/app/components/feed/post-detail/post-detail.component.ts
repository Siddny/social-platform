import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, userComment } from 'src/app/models/app.model';
import { PostService } from 'src/app/services/post/post.service';
import { Location } from '@angular/common';
// import { Post } from '../models';
// import { PostViewService } from '../services/post/post-view.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.getPostDetail();
  }

  getPostDetail(){
    const postId = this.route.snapshot.paramMap.get('id');
    this.postService.getPostDetails(postId).subscribe(post => {
      this.post = post;
      // console.log(this.post);
    });
    this.postService.getPostComments(postId).subscribe(res => {
      this.comments = res;
      // this.post.comments = res;
    });
  }

  goBack() {
    if(this.location.back() != undefined){
      this.location.back();
    }else {
      this.router.navigate(['/feeds']);
    }

  }
}