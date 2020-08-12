import { Component, OnInit } from '@angular/core';
import { PostService } from '../Post.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Array<string>;

  constructor(
    private dataService: PostService
  ) { }

  ngOnInit(): void {
    this.dataService.getTags().subscribe(data => this.tags = data);
  }

}
