import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConst } from 'src/app/constants/app.const';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = AppConst.apiPath;
  private following: Set<number> = new Set<number>(); // User IDs of followed users

  constructor(
    private http: HttpClient,
  ) {
    this.loadFollowedUsers();
  }

  getAllUsers(): Observable<any[]> {
    const url = `${this.apiUrl}users/`;
    return this.http.get<any[]>(url);
  }

  getFriendsPosts(): Observable<any[]> {
    // Implement logic to get posts from followed users
    // (e.g., make a GET request to your API to fetch posts from friends)
    return this.http.get<any[]>(`${this.apiUrl}/friends/posts`);
  }

  followUser(userId: number): void {
    if (!this.following.has(userId)) {
      this.following.add(userId);
      this.saveFollowedUsers();
    }
  }

  unfollowUser(userId: number): void {
    if (this.following.has(userId)) {
      this.following.delete(userId);
      this.saveFollowedUsers();
    }
  }

  isFollowing(userId: number): boolean {
    return this.following.has(userId);
  }

  getFollowing(): Set<number> {
    return this.following;
  }

  private saveFollowedUsers(): void {
    localStorage.setItem('followedUsers', JSON.stringify(Array.from(this.following)));
  }

  private loadFollowedUsers(): void {
    const following = localStorage.getItem('followedUsers');
    this.following = new Set<number>(following ? JSON.parse(following) : []);
  }
}
