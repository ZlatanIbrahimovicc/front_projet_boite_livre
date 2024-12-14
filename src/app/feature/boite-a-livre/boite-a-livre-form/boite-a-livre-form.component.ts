import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgIf} from "@angular/common";
import {Box} from "../../../shared/models/box";
import {ActivatedRoute, Router} from "@angular/router";
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
  private update = false;

  constructor(private route: ActivatedRoute, private boxService: BoxService,
              private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.boxService.getById(+id).subscribe((box: Box) => {
        this.item = box;
        this.update = true;
      });
    } else {
      this.item = {
        id: 0,
        nom: '',
        quantite: 0,
        description: '',
        point_geo: ''
      };
    }
  }

  onSubmit(): void {
    if (this.item) {
      if (!this.update) {
        this.boxService.create(this.item).subscribe(response => {
          console.log('Box created successfully', response);
          this.router.navigate(['/boite-a-livres/' + response.id]).then(r => r);
        });
      } else {
        this.boxService.update(this.item).subscribe(response => {
          console.log('Box updated successfully', response);
          this.router.navigate(['/boite-a-livres/' + this.item?.id]).then(r => r);
        });
      }
    }
  }
}
