import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: [''],
      password: ['']
    });
  }

  onLogin() {
    const { userName, password } = this.loginForm.value;

    if (userName === 'admin' && password === '12345678') {
      this.router.navigate(['dashboard']);
    } else {
      alert('Invalid Credentials');
    }
  }
}
