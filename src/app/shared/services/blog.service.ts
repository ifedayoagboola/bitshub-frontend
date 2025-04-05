import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../interface/core.interface';
import { Observable } from 'rxjs';
import { Blog, BlogModel } from '../interface/blog.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public skeletonLoader: boolean = false;

  constructor(private http: HttpClient) {}

  getBlogs(payload?: Params): Observable<BlogModel> {
    return this.http.get<BlogModel>(`${environment.URL}/blog.json`, { params: payload });
  }

  getBlogBySlug(slug: string): Observable<Blog> {
    return this.http.get<Blog>(`${environment.URL}/blog/slug/${slug}`);
  }
}
