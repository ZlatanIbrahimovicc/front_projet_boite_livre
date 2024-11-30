import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { AuthService } from "../../shared/auth/auth.service";
import { Router } from "@angular/router";
import { MatCard, MatCardContent, MatCardHeader } from "@angular/material/card";
import { NgIf } from "@angular/common";
import {LoginData} from "../../shared/models/user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: any = [];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

async onLogin(): Promise<void> {
  if (this.loginForm.invalid) {
    return;
  }

  try {
    let loginData: LoginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    await this.authService.login(loginData);
    if (this.authService.userProfile === null) {
      this.errors.push('Login failed');
    } else {
      await this.router.navigate(['/boiteALivre']);
    }
  } catch (error: any) {
    if (error.status === 401) {
      this.errors.push('Invalid username or password');
    } else {
      this.errors.push('An unexpected error occurred');
    }
  }
}
}
