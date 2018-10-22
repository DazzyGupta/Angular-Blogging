import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent implements OnInit {

  @Input() comment;
  @Output() delete = new EventEmitter<boolean>();
  currentUser: any;
  canModify: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe((user:any) => {    
      this.currentUser = user.user;
      this.canModify = (this.currentUser.username === this.comment.author.username);
      console.log('canModify?' + this.canModify);    
    })
  }

  deleteComment(){
    this.delete.emit(true);
  }

}
