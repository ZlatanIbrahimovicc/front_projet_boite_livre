import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/auth/auth.service";
import {BoxService} from "../../shared/services/box.service";
import {Box} from "../../shared/models/box";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardModule
} from "@angular/material/card";
import {MatTableDataSource} from "@angular/material/table";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    NgForOf,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardModule,
    NgIf
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
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

  }

  book(id: number): void {

  }

}
