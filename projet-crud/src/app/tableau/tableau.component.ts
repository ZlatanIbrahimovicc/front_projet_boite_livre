import {Component, OnInit} from '@angular/core';
import {Box} from "../models/box";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.css'
})
export class TableauComponent implements OnInit {
  Boxs : Box[] = [];
  ngOnInit(): void {
    this.BoxService.getAll().subscribe((data: Box[]) => {

      this.Boxs = data;
    });

  }
  constructor(protected override http: HttpClient, private BoxService : BoxService) {
  }

}
