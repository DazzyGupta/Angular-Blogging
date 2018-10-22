import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;
  currentUser : User;
  
  constructor(private router: Router, 
    private userService: UserService) { }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(data => {
      this.isAuthenticated = data;
    })

    this.userService.currentUser.subscribe(user => {
      // console.log(user);
      this.currentUser = user;
    })
  }
}
