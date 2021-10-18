import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  routeSub: any;
  user: any;
  status: boolean;
  constructor(private route: ActivatedRoute, private userService: UsersService) { }

  ngOnInit(): void {
    
    this.routeSub = this.route.params.subscribe(params => {
      this.deleteUser(params['id']);
      });
  }

    /**
   * Method to delete user details
   */
    deleteUser(id:any) {
      this.userService.deleteUser(id).subscribe(
        (success) => {
          this.status = true;
        }
      )
    }
}
