import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConst } from 'src/app/constants/app.const';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = AppConst.apiPath;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    const url = `${this.apiUrl}users/`;
    return this.http.get<any[]>(url);
  }

  followUser(userId: number): Observable<any> {
    // Implement follow user logic (e.g., make a POST request to your API)
    return this.http.post<any>(`${this.apiUrl}/follow/${userId}`, {});
  }

  unfollowUser(userId: number): Observable<any> {
    // Implement unfollow user logic (e.g., make a DELETE request to your API)
    return this.http.delete<any>(`${this.apiUrl}/unfollow/${userId}`);
  }

  getFriendsPosts(): Observable<any[]> {
    // Implement logic to get posts from followed users
    // (e.g., make a GET request to your API to fetch posts from friends)
    return this.http.get<any[]>(`${this.apiUrl}/friends/posts`);
  }
}
