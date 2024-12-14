import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgIf} from "@angular/common";
import {Box} from "../../../shared/models/box";
import {ActivatedRoute} from "@angular/router";
import {BoxService} from "../../../shared/services/box.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button"; // NgModel

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [FormsModule, NgIf, MatFormField, MatInput, MatCardContent, MatCardTitle, MatCard, MatButton], // Nécessaire pour les formulaires
  templateUrl: './boite-a-livre-form.component.html',
  styleUrls: ['./boite-a-livre-form.component.css']
})
export class BoiteALivreFormComponent implements OnInit {
  item: Box | null = null;

  constructor(private route: ActivatedRoute, private boxService: BoxService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.boxService.getById(+id).subscribe((box: Box) => {
        this.item = box;
      });
    }
  }

  onSubmit(): void {
    if (this.item) {
      this.boxService.update(this.item).subscribe(response => {
        console.log('Box updated successfully', response);
      });
    }
  }
}
