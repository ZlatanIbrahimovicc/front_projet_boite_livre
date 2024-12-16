import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { MapComponent } from './feature/map/map.component';
import { needLoginGuard, needLogOutGuard } from './shared/auth/auth.guard';
import { LoginComponent } from './feature/login/login.component';
import { BoiteALivreListComponent } from './feature/boite-a-livre/boite-a-livre-list/boite-a-livre-list.component';
import { BoiteALivreDetailComponent } from './feature/boite-a-livre/boite-a-livre-detail/boite-a-livre-detail.component';
import { BoiteALivreFormComponent } from './feature/boite-a-livre/boite-a-livre-form/boite-a-livre-form.component';
import { ReservationListComponent } from './feature/reservations/reservation-list/reservation-list.component';
import { ReservationFormComponent } from './feature/reservations/reservation-form/reservation-form.component';
import { ReservationDetailComponent } from './feature/reservations/reservation-detail/reservation-detail.component';
import {LogoutComponent} from "./feature/logout/logout.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'boite-a-livres', component: BoiteALivreListComponent },
  { path: 'boite-a-livres/add', component: BoiteALivreFormComponent, canActivate: [needLoginGuard] },
  { path: 'boite-a-livres/:id', component: BoiteALivreDetailComponent },
  { path: 'boite-a-livres/:id/edit', component: BoiteALivreFormComponent, canActivate: [needLoginGuard] },
  { path: 'boite-a-livres/:id/reservation', component: ReservationFormComponent, canActivate: [needLoginGuard] },
  { path: 'map', component: MapComponent },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'reservations/users/:user-id/boite-a-livres/:boite-id', component: ReservationDetailComponent, canActivate: [needLoginGuard] },
  { path: 'reservations/users/:user-id/boite-a-livres/:boite-id/edit', component: ReservationFormComponent, canActivate: [needLoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [needLogOutGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [needLoginGuard] },
  { path: '**', redirectTo: '' }
];
