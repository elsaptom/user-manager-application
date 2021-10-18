import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
userForm: FormGroup;
isSubmitted: boolean;
created: boolean;
  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router, private toastr:ToastrService) { }

  ngOnInit(): void {
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

  create() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.userService.createUser(this.userForm.value).subscribe(
        (success) => {
          console.log('test');
          this.created = true;
          this.toastr.success('User Created Successfully', 'Success');
          setTimeout(()=>{                          
            this.router.navigate(['/list-users']);
        }, 3000);
        },
        (error) => {
          console.log(error);
          this.toastr.error('Create User Failed', 'Error');
          
        }
      );
    }
  }

}
