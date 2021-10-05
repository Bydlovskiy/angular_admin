import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoryRequest, ICategoryResponse } from '../interfaces/category-interface';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = environment.url;
  private api = {
    categories : `${this.url}/categories`
  }
  constructor(private http : HttpClient) { }

  public getAllCategories() :Observable<ICategoryResponse[]>{
    return this.http.get<ICategoryResponse[]>(this.api.categories)
  }

  public addCategory(category : ICategoryRequest) :Observable<void> {
   return this.http.post<void>(this.api.categories ,category)
  }

  public editCategory (id :number ) : Observable<ICategoryResponse>{
    return this.http.get<ICategoryResponse>(`${this.api.categories}/${id}`)
  }

  public updateCategory (category : ICategoryRequest,id :number){
    return this.http.patch<void>(`${this.api.categories}/${id}`,category);
  }
  public deleteCategory(id:number):Observable<void>{
    return this.http.delete<void>(`${this.api.categories}/${id}`);
  }
}