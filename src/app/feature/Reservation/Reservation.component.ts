import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ReservationService } from '../../shared/services/reservation.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Reservation } from '../../shared/models/reservation';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './Reservation.component.html',
  styleUrls: ['./Reservation.component.css'],
})
export class ReservationFormComponent {

  reservation: Reservation = {
    id: 0,
    utilisateur: {
      id: 0,
      nom: '',
      prenom: '',
      mail: '',
      username: '',
    },
    boite: {
      id: 0,
      nom: '',
      quantite: 0,
      description: '',
      point_geo: '',
    },
    reservation: 0,
  };

  userId: number | null = null;
  boxId: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private reservationService: ReservationService) {
  }


  onSubmit(): void {
    if (this.userId == null || this.boxId == null) {
      this.errorMessage = 'Les identifiants utilisateur et boîte sont nécessaires.';
      return;
    }

    const res = {
      userId: this.userId,
      boxId: this.boxId,
      reservation: this.reservation.reservation + 1,
    };

    this.reservationService.create(res).subscribe({
      next: (response) => {
        this.reservation.reservation += 1;
        this.successMessage = 'Réservation créée avec succès !';
        this.errorMessage = null;
        console.log('Réponse du backend :', response);
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la création de la réservation.';
        this.successMessage = null;
        console.error('Erreur backend :', err);
      },
    });

}
}

