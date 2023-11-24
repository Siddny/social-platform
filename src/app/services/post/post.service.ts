import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConst } from 'src/app/constants/app.const';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl: string = AppConst.apiPath;
  private viewedPosts: Set<number> = new Set<number>();
  private dailyLimit: number | undefined;
  private blockedPosts: Set<number> = new Set<number>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.loadViewedPosts();
    this.loadBlockedPosts();
  }

  getPosts(): any {
    return this.http.get(`${this.apiUrl}/posts`);
  }

  getPostDetails(postId: string | null): Observable<any> {
    const url = `${this.apiUrl}posts/${postId}`;
    return this.http.get(url);
  }

  getPostComments(postId: string | null): Observable<any> {
    const url = `${this.apiUrl}posts/${postId}/comments`;
    return this.http.get(url);
  }

  getViewedPosts(): number {
    return this.viewedPosts.size;
  }

  getViewedPostsSet(): Set<number> {
    return this.viewedPosts;
  }

  incrementViewedPosts(postId: number): void {
    if (!this.viewedPosts.has(postId)) {
      this.viewedPosts.add(postId);
      this.saveViewedPosts();
    }
  }

  hasExceededLimit(): boolean {
    this.dailyLimit = this.authService.getMemberStatus() ? 100 : 20;
    return this.viewedPosts.size >= this.dailyLimit;
  }

  private saveViewedPosts(): void {
    localStorage.setItem('viewedPosts', JSON.stringify(Array.from(this.viewedPosts)));
  }

  private loadViewedPosts(): void {
    const viewedPosts = localStorage.getItem('viewedPosts');
    this.viewedPosts = new Set<number>(viewedPosts ? JSON.parse(viewedPosts) : []);
  }

  getMyPosts(userId: string | null): Observable<any> {
    const url = `${this.apiUrl}posts?userId=${userId}`;
    return this.http.get(url);
  }

  getAuthorName(userId: string | null): Observable<any> {
    const url = `${this.apiUrl}users?id=${userId}`;
    return this.http.get(url);
  }

  getFriendsPosts(): Observable<any[]> {
    const url = `${this.apiUrl}users`;
    return this.http.get<any[]>(url);
  }

  blockPost(postId: number): void {
    if (!this.blockedPosts.has(postId)) {
      this.blockedPosts.add(postId);
      this.saveBlockedPosts();
    }
  }

  isPostBlocked(postId: number): boolean {
    return this.blockedPosts.has(postId);
  }

  getBlockedPosts(): Set<number> {
    return this.blockedPosts;
  }

  private saveBlockedPosts(): void {
    localStorage.setItem('blockedPosts', JSON.stringify(Array.from(this.blockedPosts)));
  }

  private loadBlockedPosts(): void {
    const blockedPosts = localStorage.getItem('blockedPosts');
    this.blockedPosts = new Set<number>(blockedPosts ? JSON.parse(blockedPosts) : []);
  }
}