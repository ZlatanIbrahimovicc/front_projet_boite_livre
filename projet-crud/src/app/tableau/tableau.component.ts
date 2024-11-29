import { Component, OnInit } from '@angular/core';
import { Box } from "../models/box";
import { HttpClientModule } from "@angular/common/http";
import { BoxService } from "../services/box.service";
import { NgForOf, NgIf } from "@angular/common";
import { FormulaireComponent } from '../formulaire/formulaire.component';

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    HttpClientModule,
    FormulaireComponent
  ],
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {
  Boxes: Box[] = []; // Liste des boîtes obtenues depuis le service
  selectedItem: Box | null = null; // Élément actuellement sélectionné

  constructor(private BoxService: BoxService) {}

  // Chargement des données au démarrage
  ngOnInit(): void {
    this.BoxService.getAll().subscribe({
      next: (data: Box[]) => {
        this.Boxes = data; // Met à jour la liste des boîtes
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des boîtes :', err);
      }
    });
  }

  // Méthode pour sélectionner une boîte
  selectItem(item: Box): void {
    this.selectedItem = this.selectedItem === item ? null : item; // Toggle sélection
    console.log('Élément sélectionné :', this.selectedItem);
  }
}
