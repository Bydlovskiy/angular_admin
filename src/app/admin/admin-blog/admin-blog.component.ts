import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPostRequest, IPostResponse } from 'src/app/shared/interfaces/blog-interface';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  public AllBlog: Array<IPostResponse> = [];
  public Form !: FormGroup;
  public isEdit = false;
  public editId !: number;
  constructor(private blog: BlogService,
    private addForm: FormBuilder) { }

  ngOnInit(): void {
    this.init();
    this.getAllBlog();
  }


  init() {
    this.Form = this.addForm.group({
      "text": [null, Validators.required],
      "title": [null, Validators.required],
      "author": [null, Validators.required],
    })
  }

  getAllBlog() {
    this.blog.getAllPosts().subscribe(data => {
      this.AllBlog = data;
    }, err => {
      console.log(err);
    })
  }
  addPost(): void {
    if (this.isEdit) {
      let qqq = this.Form.value;
      qqq.date = new Date();
      qqq.imagePath = 'https://timesofindia.indiatimes.com/thumb/msid-69522041,width-1200,height-900,resizemode-4/.jpg';
      console.log(qqq);
      this.blog.updatePost(qqq,this.editId).subscribe(()=>{
        this.getAllBlog();
        this.init();
        this.isEdit = false;
      })
    } else {
      let qqq = this.Form.value;
      qqq.date = new Date();
      qqq.imagePath = 'https://timesofindia.indiatimes.com/thumb/msid-69522041,width-1200,height-900,resizemode-4/.jpg';
      this.blog.addPost(qqq).subscribe(() => {
        this.getAllBlog();
        this.init();
      })
    }
  }

  deletePost(i: number) {
    this.blog.deletePost(i).subscribe(() => {
      this.getAllBlog();
    }, err => {
      console.log('delete Post error', err);

    });
  }

  editPost(post: IPostResponse, id: number) {
    this.Form.patchValue({
      title: post.title,
      text: post.text,
      author: post.author,
    })
    this.isEdit = true;
    this.editId = id;
  }
}
