import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'
import { of } from 'rxjs';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {

  @Input() profile
  @Output() toggle = new EventEmitter<boolean>();

  constructor(private userService: UserService,
            private router: Router) { }

  ngOnInit() {
  }

  toggleFollowing(){
    this.userService.isAuthenticated.subscribe(isAuth => {
      console.log('auth?' + isAuth);
      if(!isAuth){
        this.router.navigate(['login']);
        return of(null);
      }
    })

    console.log(this.profile.following);

    if(!this.profile.following){
      console.log(this.profile);
      return this.userService.follow(this.profile.username).subscribe(data => {
        this.toggle.emit(true);
      });
    }
    else{
        return this.userService.unfollow(this.profile.username).subscribe(data => {
        this.toggle.emit(false);
      });
    }
  }
}
