import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPostRequest, IPostResponse } from '../interfaces/blog-interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private url = environment.url;
  private api = {
    blog : `${this.url}/blog`
  }
  constructor(private http : HttpClient) { }

  public getAllPosts() :Observable<IPostResponse[]>{
    return this.http.get<IPostResponse[]>(this.api.blog)
  }

  public addPost(post : IPostRequest) :Observable<void> {
   return this.http.post<void>(this.api.blog , post)
  }

  public editPost (id :number ) : Observable<IPostResponse>{
    return this.http.get<IPostResponse>(`${this.api.blog}/${id}`)
  }

  public updatePost (post : IPostRequest,id :number){
    return this.http.patch<void>(`${this.api.blog}/${id}`,post);
  }
  public deletePost(id:number):Observable<void>{
    return this.http.delete<void>(`${this.api.blog}/${id}`);
  }
}
