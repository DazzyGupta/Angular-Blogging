import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {

  username: string = null;
  articles: any;

  constructor(private articlesService: ArticlesService,
        private route : ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.username = params.username;
    })
   }

  ngOnInit() {
    this.articlesService.getMyArticles(this.username).subscribe((data: any) => {
      console.log(data);
      this.articles = data.articles;
    })
  }

}
