import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category-interface';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  public categoryForm !: FormGroup;
  public categoryList !: ICategoryResponse[];
  public isEdit = false;
  public ediId !: number;
  public deleteId !: number;
  public search !: string ;
  constructor(private categoryService: CategoryService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategoryList()
  }

  initForm() {
    this.categoryForm = this.fb.group({
      "category": [null, Validators.required]
    })
  }

  addCategory() :void {
    if (!this.isEdit) {
      this.categoryService.addCategory(this.categoryForm.value).subscribe(() => {
        this.categoryForm.reset();
        this.loadCategoryList();
      }, err => {
        console.log(err, 'error add category');
      })
    } else {
      this.categoryService.updateCategory(this.categoryForm.value,this.ediId).subscribe(() => {
        this.categoryForm.reset();
        this.loadCategoryList();
        this.isEdit = false;
      })
    }
  }

  loadCategoryList() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categoryList = data;
    }, err => {
      console.log(err, 'load categories list error');
    })
  }



  editCategory(category: ICategoryResponse): void {
    this.categoryService.editCategory(category.id).subscribe(data => {

      this.categoryForm.patchValue({
        category: data.category
      })
      this.ediId = category.id;
      this.isEdit = true;
    })
  }

  deleteCategory(): void {
    this.categoryService.deleteCategory(this.deleteId).subscribe(() => {
      this.loadCategoryList();
    })
  }

  deleteModal(id : number) : void {
    this.deleteId = id;
  }

  resetyForm () : void {
    this.categoryForm.reset();
  }


}
