import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {

  @Input() article : any;
  
  constructor( private route: Router,
      private router:ActivatedRoute) { }

  ngOnInit() {
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
  
}
