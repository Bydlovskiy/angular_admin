import { Pipe, PipeTransform } from '@angular/core';
import { ICategoryResponse } from '../interfaces/category-interface';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(categories : ICategoryResponse[],value: string ) : ICategoryResponse[] {
    if (!value){
     return categories
    }
    if(!categories){
      return []
    } 
    if (categories.filter(category => category.category.toLowerCase().includes(value.toLowerCase())).length > 0 ){
       return  categories.filter(category => category.category.toLowerCase().includes(value.toLowerCase()))
    } else {
      return []
    }
  }
}
