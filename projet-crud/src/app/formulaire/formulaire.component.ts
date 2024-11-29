import { Component, Input } from '@angular/core';
import { Box } from '../models/box'; // Modèle Box à importer
import { FormsModule } from '@angular/forms';
import {NgIf} from "@angular/common"; // NgModel

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [FormsModule, NgIf], // Nécessaire pour les formulaires
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent {
  @Input() item: Box | null = null; // Liaison avec l'élément sélectionné depuis le tableau
}
