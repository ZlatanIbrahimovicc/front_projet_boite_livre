import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardSubtitle, MatCardTitle
} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {Reservation, ReservationDTO} from "../../../shared/models/reservation";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/auth/auth.service";
import {ReservationService} from "../../../shared/services/reservation.service";
import {BoxService} from "../../../shared/services/box.service";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-reservation-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    NgForOf,
    NgIf
  ],
  templateUrl: './reservation-detail.component.html',
  styleUrl: './reservation-detail.component.css'
})
export class ReservationDetailComponent implements OnInit {
  dataSource: MatTableDataSource<Reservation> = new MatTableDataSource<Reservation>();

  constructor(private router: Router,
              protected authService: AuthService,
              private reservationService: ReservationService,
              private boxService: BoxService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('user-id');
    const boxId = this.activatedRoute.snapshot.paramMap.get('boite-id');
    if (userId && boxId) {
      this.reservationService.getOneByUserAndBox(parseInt(userId), parseInt(boxId)).subscribe((reservation: ReservationDTO) => {
        let casted_reservation: Reservation | null = null;
        this.boxService.getById(reservation.id_box).subscribe(box => {
          this.userService.getById(reservation.id_user).subscribe(user => {
            casted_reservation = {
              boite: box,
              utilisateur: user,
              reservation: reservation.reservation
            };
            this.dataSource = new MatTableDataSource<Reservation>([casted_reservation]);
          });
        });
      });
    }
  }

  goToEdit(userId: number, boxId: number) {
    this.router.navigate(['reservations/users', userId, 'boite-a-livres', boxId, 'edit']).then(r => r);
  }

  delete(userId: number, boxId: number) {
    this.reservationService.deleteByUserIdAndBoxId(userId, boxId).subscribe(() => {
      this.router.navigate(['reservations']).then(r => r);
    });
  }
}
