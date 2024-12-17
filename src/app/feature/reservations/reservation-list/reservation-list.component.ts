import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Reservation} from "../../../shared/models/reservation";
import {ReservationService} from "../../../shared/services/reservation.service";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {UserService} from "../../../shared/services/user.service";
import {BoxService} from "../../../shared/services/box.service";
import {User} from "../../../shared/models/user";
import {Box} from "../../../shared/models/box";
import {MatButton} from "@angular/material/button";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [
    MatTable,
    MatSort,
    MatFormField,
    MatInput,
    MatColumnDef,
    MatCell,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    MatButton,
    NgIf,
    NgClass
  ],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit, AfterViewInit {
  datasource: MatTableDataSource<Reservation> = new MatTableDataSource<Reservation>();
  displayedColumns: string[] = ['username', 'boxname', 'quantite'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  protected isFilteredByCurrentUser: boolean = false;

  constructor(private reservationService: ReservationService,
              private router: Router,
              private userService: UserService,
              private boxService: BoxService) {}

  ngOnInit() {
    this.reservationService.getAll().subscribe(reservations => {
      const casted_reservations: Reservation[] = [];
      reservations.forEach(reservation => {
        this.userService.getById(reservation.id_user).subscribe(user => {
          this.boxService.getById(reservation.id_box).subscribe(box => {
            const casted_reservation: Reservation = {
              utilisateur: user,
              boite: box,
              reservation: reservation.reservation
            };
            casted_reservations.push(casted_reservation);
            this.datasource.data = casted_reservations;
          });
        });
      });
    });
  }

  ngAfterViewInit() {
    this.datasource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  goToDetail(reservation: Reservation) {
    // Get the element by id in the datasource
    let user_id = reservation?.utilisateur.id;
    let box_id = reservation?.boite.id;
    this.router.navigate([`/reservations/users/${user_id}/boite-a-livres/${box_id}`]).then(r => r);
  }

  isUserConnected() {
    return localStorage.getItem('user') !== null;
  }

  filterByCurrentUser() {
    if (this.isFilteredByCurrentUser) {
      this.datasource.filter = '';
    } else {
      let currentUser: User = JSON.parse(localStorage.getItem('user') || '{}');
      this.datasource.filter = currentUser.username;
    }
    this.isFilteredByCurrentUser = !this.isFilteredByCurrentUser;
  }
}
