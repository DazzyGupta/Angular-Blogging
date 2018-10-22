import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.css']
})
export class AboutUserComponent implements OnInit {

  username: string = null;
  profile: any;
  isUser: boolean;
  currentUser: any;

  constructor(private route:ActivatedRoute,
            private articlesService: ArticlesService,
          private userService: UserService) {
      this.route.params.subscribe(params => {
        this.username = params.username;
      })
     }

  ngOnInit() {
      this.articlesService.getAuthorDetails(this.username).subscribe((data:any) => {
      console.log(data);
      this.profile = data.profile;   
      console.log(this.profile.username);
    })

      this.userService.getUser().subscribe((user:any) => {
      console.log(user);
      this.currentUser = user.user;  
      console.log(this.currentUser.username);  
      this.isUser = (this.currentUser.username === this.profile.username);
      console.log(this.isUser);            
    })
  }

  onToggleFollowing(isFollowing: boolean) {
    console.log(isFollowing);
    this.profile.following = isFollowing;
  }
}
