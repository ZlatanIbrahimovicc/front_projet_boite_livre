import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  userIsConnected() {
    return this.authService.getUser() !== null;
  }

  disconnect() {
    this.authService.logOut().then((r: any) => r);
  }
}
