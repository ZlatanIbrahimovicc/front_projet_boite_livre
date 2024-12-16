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
    MatPaginator
  ],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit, AfterViewInit {
  datasource: MatTableDataSource<Reservation> = new MatTableDataSource<Reservation>();
  displayedColumns: string[] = ['username', 'boxname', 'quantite'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
              id: reservation.reservation,
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

  goToDetail(id: number) {
    this.router.navigate([`/reservations/${id}`]).then(r => r);
  }
}
