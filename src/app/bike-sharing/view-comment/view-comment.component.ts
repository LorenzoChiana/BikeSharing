import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommentService } from '../services/comment.service';
import { Comment } from '../structDb';

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  //styleUrls: ['./view-rent.component.css']
  styleUrls: ['../view/view.component.css']
})
export class ViewCommentComponent implements OnInit {

  private isAdmin : boolean;
  private nameUser : string;

  private codeBike: string;

  private comments : Comment[];

  constructor(private commentService :CommentService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.nameUser = localStorage.getItem('login');
    this.isAdmin = (localStorage.getItem('isAdmin') == 'true');

    this.route.params.subscribe((params) => {
      this.codeBike = params.codeBike;
    });

    this.commentService.getBikeComment(this.codeBike).subscribe(data =>  {
      this.comments = data;
    });
  }

  goBack(): void {
    this.location.back();
  }

}
