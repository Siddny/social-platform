import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPostsComponent } from './components/feed/my-posts/my-posts.component';
import { PostDetailComponent } from './components/feed/post-detail/post-detail.component';
import { PostListComponent } from './components/feed/post-list/post-list.component';
import { FollowingComponent } from './components/following/following.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/feeds', pathMatch: 'full' }, // Redirect to feed on root
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'users', component: UsersComponent },
  { path: 'feeds', component: PostListComponent },
  { path: 'my-posts', component: MyPostsComponent },
  { path: 'feed/:id', component: PostDetailComponent },
  { path: 'following', component: FollowingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
