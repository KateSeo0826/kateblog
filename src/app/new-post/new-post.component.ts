import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  blogPost = new BlogPost();
  tags: string;
  tagsArray: string[];

  constructor(
    private dataService: PostService,
    private route: Router
  ) { }

  formSubmit(): void{
    this.tags = this.blogPost.tags != null ? this.blogPost.tags.toString() : '';
    this.tagsArray = this.tags.split(',').map(tag => tag.trim());
    this.blogPost.tags = this.tagsArray;
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date().toLocaleDateString();
    this.blogPost.postedBy = 'Kate Seo';
    this.blogPost.views = 0;

    this.dataService.newPost(this.blogPost).subscribe(() => this.route.navigate(['/admin']));
    console.log(this.blogPost.title);
  }

  ngOnInit(): void {
  }

}
