import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticlesService } from '../services/articles.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {

  slug: string;
  title: string;
  description: string;
  body: string;

  constructor(private articlesService: ArticlesService,
            private router: Router,
            private route: ActivatedRoute) {
              this.route.params.subscribe(params => {
                this.slug = params.slug;
              })
            }

  tagField= new FormControl();
  tagList: any = [];

  articleForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    body: new FormControl()
  });


  ngOnInit() {
    this.articlesService.getArticleDetails(this.slug).subscribe((article:any) =>{
      console.log(article.article);
      this.title = article.article.title;
      this.description = article.article.description;
      this.body = article.article.body;
     this.articleForm.setValue({
       title: this.title,
       description: this.description,
       body: this.body
     })
    })
  }

  onSubmit(){
    const article = {
      "article": {
        "title": this.articleForm.value.title,
        "description": this.articleForm.value.description,
        "body": this.articleForm.value.body
      }
    }

    this.articlesService.updateArticle(article, this.slug).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/article/' + this.slug);
    })
  }

  addTag(){
    const tag = this.tagField.value;
    // console.log('tagField:' + this.tagField.value);
    if(this.tagList.indexOf(tag) < 0){
      this.tagList.push(tag);
    }
    this.tagField.reset('');
  }

  removeTag(tagName : string){
    this.tagList = this.tagList.filter(tag => tag!= tagName)
  }

}
