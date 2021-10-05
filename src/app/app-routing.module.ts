import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminComponent } from './admin/admin.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  {path: 'blog' , component : BlogComponent},
  {path : 'admin',component :AdminComponent,children : [
    {path : 'blog' , component :AdminBlogComponent},
    {path : 'products' , component :AdminProductsComponent},
    {path : 'category' , component :AdminCategoryComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
