import { Component, OnInit } from '@angular/core';
import { PostService } from '../Post.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Array<any>;
  constructor(
    private dataService: PostService
  ) { }

  ngOnInit(): void {
    this.dataService.getCategories().subscribe(data => this.categories = data);
  }
}
