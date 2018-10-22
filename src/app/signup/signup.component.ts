import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  
  signupForm = new FormGroup({
    "email" : new FormControl(),
    "password": new FormControl(),
    "userName": new FormControl()
  })

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  signUp() {
    const user  = {
      user: {
        username: this.signupForm.value.userName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      }
    };
    
    this.userService.signUp(user).subscribe(user => {
         console.log(user);

      });
  }
}
