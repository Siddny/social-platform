import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from './components/feed/post-detail/post-detail.component';
import { PostListComponent } from './components/feed/post-list/post-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/feeds', pathMatch: 'full' }, // Redirect to feed on root
  { path: 'login', component: LoginComponent },
  { path: 'feeds', component: PostListComponent },
  { path: 'feed/:id', component: PostDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
