import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../BlogPost';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  blogPost: BlogPost;
  tags: string;
  tagsArray: string[];


  constructor(
    private dataService: PostService,
    private route: Router,
    private activateRoute: ActivatedRoute
  ) { }

  formSubmit(): void {
    this.tags = this.blogPost.tags != null ? this.blogPost.tags.toString() : '';
    this.tagsArray = this.tags.split(',').map(tag => tag.trim());
    this.blogPost.tags = this.tagsArray;
    this.dataService.updatePostById(this.blogPost._id, this.blogPost).subscribe(() => this.route.navigate(['/admin']));
  }

  deltePost(): void {
    this.dataService.deletePostById(this.blogPost._id).subscribe(() => this.route.navigate(['/admin']));
  }


  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => this.dataService.getPostbyId(params.id).subscribe(data => {
      this.blogPost = data;
      this.tags = this.blogPost.tags.toString();
    })
    );
  }
}
