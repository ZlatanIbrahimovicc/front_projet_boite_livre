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
import {NgForOf, NgIf} from "@angular/common";
import {LoginData} from "../../shared/models/user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string = '';

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
      };
      await this.authService.login(loginData);
      if (this.authService.getUser() === null) {
        this.error = 'Invalid username or password';
      } else {
        await this.router.navigate(['/boiteALivre']);
      }
    } catch (error: any) {
      if (401 in error) {
        this.error = 'Invalid username or password';
      } else {
        this.error = 'An error occurred. Please try again.';
      }
    }
  }
}
