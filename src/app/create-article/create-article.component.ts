import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Article } from '../models/article.model'
import { ActivatedRoute, Router } from '@angular/router';
import {ArticlesService} from '../services/articles.service'

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  tagList: any = [];
  tagField = new FormControl();
  errors: Object ={};

  articleForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    body: new FormControl()
  });

  constructor(private router: Router,
          private articlesService: ArticlesService) {
    this.tagList = [];
   }

 
  ngOnInit() {
  }

  addTag(){
    const tag = this.tagField.value;
    if(this.tagList.indexOf(tag) < 0){
      this.tagList.push(tag);
    }
    this.tagField.reset('');
  }

  removeTag(tagName : string){
    this.tagList = this.tagList.filter(tag => tag!= tagName)
  }

  onSubmit(){
    const article = {
      "article":{
        "title": this.articleForm.value.title,
        "description": this.articleForm.value.description,
        "body" : this.articleForm.value.body,
        "tagList": this.tagList
      }
    }

    console.log(this.articleForm.value);

    this.articlesService.newArticle(article).subscribe(
      article => {
        console.log(article);
        this.router.navigate(['']);
        err => {
        this.errors = err;
      }
    });
  }
}
