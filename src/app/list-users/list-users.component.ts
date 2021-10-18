import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faEye, faPlusSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: any;
  page: any = 0;
  view = faEye;
  add = faPlusSquare;
  edit = faEdit;
  delete = faTrashAlt;
  constructor(private userService: UsersService, private router: Router, private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  /*Method to call get user list api */
  getUsers() {
    this.userService.getUsers(this.page).subscribe(
      (success) => {
        this.users = success.data;
      }
    )
  }

  /*Method to navigate to user details page */
  viewUser(id: any) {
        this.router.navigate(['view-user', id]);
  }

   /*Method to navigate to update user details page */
   editUser(id: any) {
        this.router.navigate(['edit-user', id]);
  }

  //  /*Method to navigate to delete user details page */
  //  deleteUser(id: any) {
  //       this.router.navigate(['delete-user', id]);
  // }

    /**
   * Method to delete user details
   */
     deleteUser(id:any) {
      this.userService.deleteUser(id).subscribe(
        (success) => {
          // this.status = true;
          this.toastr.success('User Created Successfully', 'Success');

        }
      )
    }

   /*Method to navigate to create user details page */
  createUser() {
    this.router.navigate(['create-user']);
  }

  /*Method invoked for logout */
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
