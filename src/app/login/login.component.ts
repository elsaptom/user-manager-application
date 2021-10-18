import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted: boolean;
  constructor(public formBuilder: FormBuilder, 
    private authService: AuthService, 
    private toastr: ToastrService,
    private router: Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }

  /*
  Method invoked on click of login button
  */
  login(): void {
      this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.spinner.show();
      this.authService.login(this.loginForm.value).subscribe(
        (success) => {
          this.spinner.hide();
           localStorage.setItem('ACCESS_TOKEN', JSON.stringify(success));
          this.router.navigate(['/list-users'])
        },
        (error) => {
          this.spinner.hide();
            this.toastr.error('Invalid Credentials', 'Error');
        }
      );
    }
  }

}
