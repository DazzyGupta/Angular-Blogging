import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: User = {} as User;
  errors: Object = {};

  settingsForm = new FormGroup({
    image: new FormControl(),
    bio: new FormControl(),
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private router: Router,
              private userService: UserService) {
   }
  
  ngOnInit() {
  }

  updateSettings(){
    const setting = {
      "user" : {
        "image": this.settingsForm.value.image,
        "bio" : this.settingsForm.value.bio,
        "email" : this.settingsForm.value.email
      }
    }

    console.log(setting);
    this.userService.updateSetting(setting).subscribe(
      user => {
        console.log(user);
        this.router.navigate(['login'])
      },
      err => {
        this.errors = err;
      }
    );
  }

  logout(){
    this.userService.purgeAuth();
    this.router.navigate(['home']);
  }

}
