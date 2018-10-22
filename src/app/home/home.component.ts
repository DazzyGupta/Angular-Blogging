import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ArticleList } from '../models/article-list.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tagList: any;
  isAuthenticated: boolean;
  listConfig: ArticleList = {
    type: 'all',
    filters: {}
  };

  constructor(private articlesService: ArticlesService,
            private userService: UserService,
            private router: Router) { }

  ngOnInit() {
    this.articlesService.getTags().subscribe((data: any) => {
      this.tagList = data.tags;
      console.log(this.tagList);
    })

    this.userService.isAuthenticated.subscribe(data => {
      this.isAuthenticated = data;
      if(this.isAuthenticated == true){
        this.setListTo('feed');
      }else {
        this.setListTo('all');
      }
    });
  }

  setListTo(type: string = '', filters: Object = {}) {
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.listConfig = {type: type, filters: filters};
    console.log(this.listConfig);
  }
}
