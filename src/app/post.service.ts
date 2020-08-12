import { environment } from '../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BlogPost } from './BlogPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('[PostService] client-side error', error.error.message);
    } else {
      console.log(`[PostService] server-side error: status=${error.status}`, error.error);
    }
    return throwError('Error communicating with API server');
  }

  getPosts(page: number, tag: string, category: string): Observable<BlogPost[]> {
    const perPage = 6;
    let url = '';

    if (tag != null) {
      url = `${this.apiUrl}/posts?page=${page}&perPage=${perPage}&tag=${tag}`;
    }
    else if (category != null) {
      url = `${this.apiUrl}/posts?page=${page}&perPage=${perPage}&category=${category}`;
    }
    else {
      url = `${this.apiUrl}/posts?page=${page}&perPage=${perPage}`;
    }
    return this.http.get<BlogPost[]>(url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getPostbyId(id: string): Observable<BlogPost> {
    const url = `${this.apiUrl}/posts/${id}`;
    return this.http.get<BlogPost>(url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getCategories(): Observable<any> {
    const url = `${this.apiUrl}/categories`;
    return this.http.get<BlogPost['category']>(url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getTags(): Observable<string[]> {
    const url = `${this.apiUrl}/tags`;
    return this.http.get<BlogPost['tags']>(url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


  getAllBlogPosts(): Observable<BlogPost[]> {
    const MAX_NUMBER = Number.MAX_SAFE_INTEGER;
    let url = ' ';
    url = `${this.apiUrl}/posts?page=1&perPage=${MAX_NUMBER}`;

    return this.http.get<BlogPost[]>(url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/posts/${id}`);
  }
}
