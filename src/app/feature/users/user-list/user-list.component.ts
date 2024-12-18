import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/user";
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
import {Router, RouterLink} from "@angular/router";

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
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButton,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],

})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAll().subscribe((data) => {
      this.users = data;
    });
  }

  onDelete(id: number): void {
    this.userService.delete(id).subscribe(() => {
      this.fetchUsers();
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/users', id]);
  }
}
