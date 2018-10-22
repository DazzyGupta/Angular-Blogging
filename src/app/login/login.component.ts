import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : any;

  loginForm = new FormGroup({
    "email" : new FormControl(),
    "password": new FormControl()
  })

  constructor(private userService : UserService,
            private router : Router,
            private http: HttpClient) { }

  ngOnInit() {
  }

  login(){
    this.user = {
      "user":{
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }
    }
    
    this.userService.login(this.user).subscribe((user: any) =>{
      this.userService.setAuth(user.user);
    });
    this.router.navigate(['']);
  }
}
