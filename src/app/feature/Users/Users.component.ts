import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {MatSort, MatSortModule} from "@angular/material/sort";
import {Reservation, ReservationDTO} from "../../shared/models/reservation";
import {ReservationService} from "../../shared/services/reservation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {UserService} from "../../shared/services/user.service";
import {BoxService} from "../../shared/services/box.service";
import {User} from "../../shared/models/user";
import {Box} from "../../shared/models/box";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";



import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableModule
} from "@angular/material/table";

import {MatIconModule} from "@angular/material/icon";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-UsersComponent',
  templateUrl: './Users.component.html',
  styleUrls: ['./Users.component.css'],
  standalone: true,

    imports: [
      BrowserModule,
      ReactiveFormsModule,
      MatCardModule,
      MatTableModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatSortModule,
      MatPaginatorModule,
    ],

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
