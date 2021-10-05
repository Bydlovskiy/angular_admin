import { Component, OnInit } from '@angular/core';
import { IPostResponse } from '../shared/interfaces/blog-interface';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public AllBlog: Array<IPostResponse> = [];
  constructor(private blog : BlogService) { }

  ngOnInit(): void {
    this.getAllBlog();
  }

  getAllBlog() {
    this.blog.getAllPosts().subscribe(data => {
      this.AllBlog = data;
    }, err => {
      console.log(err);
    })
  }

}
