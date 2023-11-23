import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  my_posts: any;

  constructor(
    private postService: PostService,
  ) {}

  ngOnInit() {
    this.getMyPosts();
  }

  getMyPosts(){
    const userId = localStorage.getItem('user_id');
    this.postService.getMyPosts(userId).subscribe(posts => {
      posts.forEach((element: any) => {
        this.postService.getAuthorName(element.userId).subscribe(
          (user) => {
            element['author'] = user[0].name;
          });
      });
      this.my_posts = posts;
    });
  }
}
