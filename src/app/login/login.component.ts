import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router) { }

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
      this.authService.login(this.loginForm.value).subscribe(
        (success) => {
          localStorage.setItem('ACCESS_TOKEN', JSON.stringify(success));
          this.router.navigate(['/list-users'])
        },
        (error) => {
            this.toastr.error('Invalid Credentials', 'Error');
        }
      );
    }
  }

}
