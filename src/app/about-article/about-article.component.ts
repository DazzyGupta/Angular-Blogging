import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ArticlesService } from '../services/articles.service';
import { UserService } from '../services/user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-about-article',
  templateUrl: './about-article.component.html',
  styleUrls: ['./about-article.component.css']
})
export class AboutArticleComponent implements OnInit {

 slug: string = null;
 article: any;
 currentUser: any;
 canModify: boolean;  
 isAuthenticated: boolean;
 comment = new FormControl();
 comments: any;

  constructor(private route:ActivatedRoute,  
      private articlesService: ArticlesService,
      private userService: UserService,
      private router: Router) {
        this.route.params.subscribe(params => {
          this.slug = params.slug;
        })
       }

  ngOnInit() {

      this.userService.isAuthenticated.subscribe(data => this.isAuthenticated = data);

      this.articlesService.getArticleDetails(this.slug).subscribe((data:any) => {
        this.article = data.article;  
        console.log('author?' + this.article.author.username); 
      })

      this.userService.getUser().subscribe((user:any) => {
        console.log(user);
        this.currentUser = user.user;   
        console.log('loggeduser?'+ this.currentUser.username); 
        this.canModify = (this.currentUser.username === this.article.author.username);
        console.log('canModify?' + this.canModify);    
      })

      console.log(this.slug);
      this.articlesService.getComments(this.slug).subscribe((comments:any) => {
       this.comments = comments.comments;
       console.log(this.comments);
       this.router.navigateByUrl('/article/' + this.slug);
      })
    }

  
  deleteArticle(){
      return this.articlesService.deleteArticle(this.article.slug).subscribe(data => {
        console.log('article deleted');
        this.router.navigateByUrl('/profiles/' + this.currentUser.username);
      })
    }
  
    onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;
    console.log(this.article.favorited);

    if (this.article.favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    console.log(following);
  }  

  addComment(){
    const comment = {
      "comment": {
        "body": this.comment.value
      }
    }

    this.articlesService.addComment(comment,this.slug).subscribe((comment:any) => {
      this.comments.unshift(comment.comment);
      this.comment.reset('');
      this.router.navigateByUrl('/article/' + this.slug);
    })
  }

  deleteComment(comment){
    console.log(comment.id);
    this.articlesService.deleteComment(this.slug, comment.id).subscribe(data => {
      this.comments = this.comments.filter(comments => comments !== comment);
      this.router.navigateByUrl('/article/' + this.slug);
    })
  }
}
