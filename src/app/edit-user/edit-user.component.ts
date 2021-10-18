import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  routeSub:any;
  user: any = {};
  userForm: FormGroup;
  isSubmitted: boolean;
  created: boolean;
  noUser: boolean;
  constructor(private userService: UsersService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
    this.getUser(params['id']);
    });
    this.userForm = this.formBuilder.group({
      address: ["", [Validators.required, Validators.minLength(10)]],
      pincode: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      email:  ["", [Validators.required, Validators.email]],
      firstname:  ["", [Validators.required]],
      lastname: ["", [Validators.required]],
    username:  ["", [Validators.required]]
    });
  }

  get formControl() {
    return this.userForm.controls;
  }

  /**
   * Method to get user details
   */
  getUser(id: any) {
    this.userService.viewUser(id).subscribe(
      (success) => {
        this.user = success.data;
        this.userForm.get('email')?.setValue(this.user.email);
        this.userForm.get('firstname')?.setValue(this.user.first_name);
        this.user.address? this.userForm.get('address')?.setValue(this.user.address) : this.userForm.get('address')?.setValue('');
        this.userForm.get('lastname')?.setValue(this.user.last_name);
        this.userForm.get('username')?.setValue(this.user.username);
        this.userForm.get('pincode')?.setValue(this.user.pincode);
      },
      (error) => {
        this.noUser = true;
      }
    )
  }

  update() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.userService.updateUser(this.userForm.value).subscribe(
        (success) => {
          console.log('test');
          this.created = true;
          this.toastr.success('User Updated Successfully', 'Success');
          setTimeout(()=>{                         
            this.router.navigate(['/list-users']);
        }, 3000);
        },
        (error) => {
          this.toastr.error('User Update Failed', 'Error');
          console.log(error);
          
        }
      );
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}