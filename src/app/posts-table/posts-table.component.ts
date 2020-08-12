import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {

  blogPosts: Array<BlogPost>;

  constructor(
    private dataService: PostService,
    private route: Router
  ) { }


  // tslint:disable-next-line: typedef
  rowClicked(e, id){
    this.route.navigate(['/admin/post', id]);
  }
  ngOnInit(): void {
    this.dataService.getAllBlogPosts().subscribe(data => this.blogPosts = data);
  }

}
