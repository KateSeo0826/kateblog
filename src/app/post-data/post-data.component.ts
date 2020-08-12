import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../Post.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit, OnDestroy {

  post: BlogPost;
  private querySub: any;
  commentName: string;
  commentText: string;

  constructor(
    // Inject PostService
    private dataService: PostService,
    // Inject ActivatedRoute
    private route: ActivatedRoute
  ) { }

  submitComment(): void {
    this.post.comments.push({ author: this.commentName, comment: this.commentText, date: new Date().toLocaleDateString() });
    this.dataService.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentName = '';
      this.commentText = '';
    });
  }
  ngOnInit(): void {
    // TODO: Get post by Id params['id'] and store the result in this.post
    this.querySub = this.route.params.subscribe((params: Params) => {
      this.dataService.getPostbyId(params.id).subscribe(data => {
        this.post = data;
        this.post.views += 1;
        this.dataService.updatePostById(this.post._id, this.post).subscribe();
      });
    });
  }


  ngOnDestroy(): void {
    // If we have a subscription, tear it down when the component is destroyed
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }


}
