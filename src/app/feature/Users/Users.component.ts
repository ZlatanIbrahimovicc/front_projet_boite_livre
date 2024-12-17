import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatCard} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-UsersComponent',
  standalone: true,
  imports: [
    MatCard,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatButton,
    FormsModule,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    NgIf,
    MatLabel
  ],
  templateUrl: './Users.component.html',
  styleUrls: ['./Users.component.css'],

})
export class UsersComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  isEditMode: boolean = false;
  currentUserId?: number;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAll().subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const user: User = this.userForm.value;
    this.userService.create(user).subscribe(() => {this.fetchUsers();this.resetForm();});
  }

  onDelete(id: number): void {
    this.userService.delete(id).subscribe(() => {
      this.fetchUsers();
    });
  }

  resetForm(): void {
    this.userForm.reset();
    this.isEditMode = false;
    this.currentUserId = undefined;
  }
}
