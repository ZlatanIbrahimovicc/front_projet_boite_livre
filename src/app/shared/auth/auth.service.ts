import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { LoginData, LoginResponse, User } from '../models/user';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/';
  private loginUrl = `${this.baseUrl}login`;

  private http = inject(HttpClient);
  private router = inject(Router);
  private userService = inject(UserService);

  public userLoggedIn = new EventEmitter<void>();

  async login(loginData: LoginData): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post(this.loginUrl, loginData, { observe: 'response' }).pipe(
          catchError(this.handleError)
        )
      );
      if (response.body) {
        await this.fetchUserProfile(response.body as LoginResponse);
        this.userLoggedIn.emit();
      } else {
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logOut(): Promise<void> {
    try {
      localStorage.removeItem('user');
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw 'An error occurred during logout. Please try again.';
    }
  }

  private async fetchUserProfile(id: LoginResponse): Promise<void> {
    try {
      this.userService.getById(Number(id)).subscribe((response) => {
        localStorage.setItem('user', JSON.stringify(response));
      });
    } catch (error) {
      console.error('Fetch user profile error:', error);
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 401) {
        errorMessage = 'Invalid username or password';
      } else if (error.error instanceof ProgressEvent) {
        errorMessage = `Error: ${error.message}`;
      } else {
        errorMessage = `Error: ${error.error}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  public getUser(): User | null {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  }
}
