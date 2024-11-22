import { Component } from '@angular/core';
import {RouterLinkActive, RouterOutlet} from '@angular/router';
import {TableauComponent} from "./tableau/tableau.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {HomeComponent} from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableauComponent, RouterOutlet, RouterLinkActive, NavbarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projet-crud';
}
