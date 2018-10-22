import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService} from '../services/user.service'
import { concatMap ,  tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {

  @Input() article;
  @Output() toggle = new EventEmitter<boolean>();

  constructor(private userService: UserService,
        private articlesService: ArticlesService,
        private router: Router) { }

  ngOnInit() {
  }

  toggleFavorite(){
    this.userService.isAuthenticated.subscribe(isAuth => {
      console.log('auth?'+ isAuth);
      if(!isAuth){
        this.router.navigate(['login']);
        return of(null);
      }
    })

    console.log(this.article.favorited);

    if(!this.article.favorited){
      return this.articlesService.favorite(this.article.slug).subscribe(data => {
        this.toggle.emit(true);
      });
    }
    else{
      return this.articlesService.unfavorite(this.article.slug).subscribe(data => {
        this.toggle.emit(false);
      });
    }
  }
}

