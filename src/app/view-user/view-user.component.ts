import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  routeSub:any;
  user: any = {};
  noUser: boolean;
  constructor(private userService: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
    this.getUser(params['id']);
    });
  }

  /**
   * Method to get user details
   */
  getUser(id: any) {
    this.userService.viewUser(id).subscribe(
      (success) => {
        this.user = success.data;
      },
      (error) => {
        this.noUser = true;
      }
    )
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
