import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favorited',
  templateUrl: './favorited.component.html',
  styleUrls: ['./favorited.component.css']
})
export class FavoritedComponent implements OnInit {

  username: string = null;
  favArticles: any;

  constructor( private articlesService: ArticlesService,
      private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.username = params.username;
     
    })
  }

  ngOnInit() {
    this.articlesService.getFavArticles(this.username).subscribe((data:any) => {
      this.favArticles = data.articles;
      console.log(data.articles);
    })
  }
}
