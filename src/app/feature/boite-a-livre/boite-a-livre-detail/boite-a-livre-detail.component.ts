import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/auth/auth.service";
import {BoxService} from "../../../shared/services/box.service";
import {Box} from "../../../shared/models/box";
import {NgForOf, NgIf} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardModule
} from "@angular/material/card";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    NgForOf,
    MatCardContent,
    MatCardActions,
    MatCardModule,
    NgIf
  ],
  templateUrl: './boite-a-livre-detail.component.html',
  styleUrl: './boite-a-livre-detail.component.css'
})
export class BoiteALivreDetailComponent implements OnInit {
  dataSource: MatTableDataSource<Box> = new MatTableDataSource<Box>();

  constructor(private router: Router,
              protected authService: AuthService,
              private BoxService: BoxService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.BoxService.getById(+id).subscribe((box: Box) => {
        this.dataSource = new MatTableDataSource<Box>([box]);
      });
    }
  }

  goToEdit(id: number): void {
    this.router.navigate([`boite-a-livres/${id}/edit`]).then(r => r);
  }

  book(id: number): void {
    this.router.navigate([`boite-a-livres/${id}/reservations/new`]).then(r => r);
  }

}
