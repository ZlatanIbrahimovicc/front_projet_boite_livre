import {Component, OnInit} from '@angular/core';
import {Box} from "../models/box";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BoxService} from "../services/box.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [
    NgForOf,
    HttpClientModule
  ],
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {
  Boxes: Box[] = [];

  ngOnInit(): void {
    this.BoxService.getAll().subscribe((data: Box[]) => {
      this.Boxes = data;
    });
  }

  constructor(private BoxService : BoxService) {
  }

}
