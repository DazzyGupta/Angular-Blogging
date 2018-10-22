import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { ArticleList } from '../models/article-list.model'
import { Article } from '../models/article.model';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  constructor(private articlesService: ArticlesService) { }

  @Input()
  set config(config: ArticleList) {
    if (config) {
      this.query = config;
      this.runQuery();
    }
  }

  query: ArticleList;
  results: Article[];

  ngOnInit() {
  }

  runQuery(){
    this.results = [];
    console.log(this.query);
    this.articlesService.query(this.query).subscribe((data:any) => {
      this.results = data.articles;
      console.log(this.results);
      console.log(data);
    })
  }
}
