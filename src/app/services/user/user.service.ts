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
  private blockedUsers: Set<number> = new Set<number>(); // User IDs of blocked users

  constructor(
    private http: HttpClient,
  ) {
    this.loadFollowedUsers();
    this.loadBlockedUsers();
  }

  getAllUsers(): Observable<any[]> {
    const url = `${this.apiUrl}users/`;
    return this.http.get<any[]>(url);
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

  blockUser(userId: number): void {
    if (!this.blockedUsers.has(userId)) {
      this.blockedUsers.add(userId);
      this.saveBlockedUsers();
    }
  }

  unBlockUser(userId: number): void {
    if (this.blockedUsers.has(userId)) {
      this.blockedUsers.delete(userId);
      this.saveBlockedUsers();
    }
  }

  isBlocked(userId: number): boolean {
    return this.blockedUsers.has(userId);
  }

  getBlocked(): Set<number> {
    return this.blockedUsers;
  }

  private saveBlockedUsers(): void {
    localStorage.setItem('blockedUsers', JSON.stringify(Array.from(this.blockedUsers)));
  }

  private loadBlockedUsers(): void {
    const blockedUsers = localStorage.getItem('blockedUsers');
    this.blockedUsers = new Set<number>(blockedUsers ? JSON.parse(blockedUsers) : []);
  }

  userFollowPostUnblocked(): Set<number> {
    const followed = this.getFollowing();
    const blocked = this.getBlocked();
    const result = new Set<number>();

    followed.forEach((value) => {
      // If the user is not in blocked, add it to the result set
      if (!blocked.has(value)) {
        result.add(value);
      }
    });
    return result;
  }
}
