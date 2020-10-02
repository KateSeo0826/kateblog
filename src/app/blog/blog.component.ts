import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogPosts: Array<BlogPost>;
  // tslint:disable-next-line: no-inferrable-types
  page = 1;
  tag: string = null;
  category: string = null;
  querySub: any;

  constructor(
    private dataService: PostService,
    private route: ActivatedRoute,
  ) { }

  // tslint:disable-next-line: typedef
  getPage(num: number) {
    this.dataService.getPosts(num, this.tag, this.category).subscribe(data => {
      if (data.length > 0) {
        this.blogPosts = data;
        this.page = num;
      }
    });
  }

  ngOnInit(): void {

    this.querySub = this.route.queryParams.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      if (params['tag']) {
        // tslint:disable-next-line: no-string-literal
        this.tag = params['tag'];
        this.category = null;
      } else {
        this.tag = null;
      }
      // tslint:disable-next-line: no-string-literal
      if (params['category']) {
        // tslint:disable-next-line: no-string-literal
        this.category = params['category'];
        this.tag = null;
      } else {
        this.category = null;
      }
      this.getPage(+params.page || 1);
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }
}
