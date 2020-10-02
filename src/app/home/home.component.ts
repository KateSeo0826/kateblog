import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Array<BlogPost>;
  categories: Array<any>;

  constructor(
    private dataService: PostService
  ) { }

  ngOnInit(): void {
    this.dataService.getPosts(1, null, null).subscribe(data => this.posts = data.slice(0, 3));
    this.dataService.getCategories().subscribe(data => this.categories = data);
  }

}
