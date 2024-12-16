import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ReservationService} from '../../../shared/services/reservation.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ReservationDTO} from '../../../shared/models/reservation';
import {ActivatedRoute, Router} from "@angular/router";
import {BoxService} from "../../../shared/services/box.service";
import {Box} from "../../../shared/models/box";

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit{
  successMessage: string = "";
  errorMessage: string = "";
  reservationForm: FormGroup;
  private boxId: number = 0;
  private userId: number = 0;

  constructor(private fb: FormBuilder,
              private reservationService: ReservationService,
              private router: Router,
              private route: ActivatedRoute,
              private boxService: BoxService) {
    this.reservationForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boxId = params['id'];
    });
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.userId = user.id;
    } else {
      this.errorMessage = 'User not found in local storage.';
      return;
    }

    if (this.userId == null || this.boxId == null) {
      this.errorMessage = 'Les identifiants utilisateur et boîte sont nécessaires.';
      return;
    }
  }

  onSubmit(): void {
    if (this.reservationForm.invalid) {
      this.errorMessage = 'Le formulaire est invalide.';
      return;
    }
    const quantity = this.reservationForm.get('quantity')?.value;
    this.boxService.getById(this.boxId).subscribe({
      next: (box: Box) => {
        if (quantity > box.quantite) {
          this.errorMessage = 'La quantité demandée est supérieure à la quantité disponible';
          return;
        }
        const res: ReservationDTO = {
          id_user: this.userId,
          id_box: this.boxId,
          reservation: quantity,
        };
        this.reservationService.create(res).subscribe({
          next: (response) => {
            this.successMessage = 'Réservation créée avec succès !';
            this.errorMessage = "";
            this.router.navigate(['/home']).then(r => r);

          },
          error: (err: any) => {
            this.errorMessage = 'Erreur lors de la création de la réservation.';
            this.successMessage = "";
            console.error('Erreur backend :', err);
          },
        });
      }
    });

}
}
