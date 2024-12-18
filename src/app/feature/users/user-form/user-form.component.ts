import {Component, OnInit} from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { NgIf } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { User } from "../../../shared/models/user";
import { UserService } from "../../../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode: boolean = false;
  currentUserId?: number;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: [''],
      username: ['', Validators.required],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.currentUserId = parseInt(id);
      this.userService.getById(this.currentUserId).subscribe(user => {
        this.userForm.patchValue(user);
        this.updatePasswordValidator();
      })
    } else {
      this.isEditMode = false;
      this.updatePasswordValidator();
    }
  }

  updatePasswordValidator() {
    const passwordControl = this.userForm.get('password');
    if (this.isEditMode) {
      passwordControl?.clearValidators();
    } else {
      passwordControl?.setValidators([Validators.required]);
    }
    passwordControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;
    const user: User = this.userForm.value;
    if (this.isEditMode) {
      this.userService.update(user).subscribe(() => {
        this.router.navigate(['/users']).then(r => r);
      });
    } else {
      this.userService.create(user).subscribe(() => {
        this.router.navigate(['/users']).then(r => r);
      });
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.isEditMode = false;
    this.currentUserId = undefined;
    this.updatePasswordValidator();
  }
}
