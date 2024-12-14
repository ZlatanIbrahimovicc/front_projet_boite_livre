import { Routes } from '@angular/router';
import {HomeComponent} from "./feature/home/home.component";
import {MapComponent} from "./feature/map/map.component";
import {ReservationFormComponent} from "./feature/Reservation/Reservation.component";
import {needLoginGuard, needLogOutGuard} from "./shared/auth/auth.guard";
import {LoginComponent} from "./feature/login/login.component";
import {
  BoiteALivreListComponent
} from "./feature/boite-a-livre/boite-a-livre-list/boite-a-livre-list.component";
import {
  BoiteALivreDetailComponent
} from "./feature/boite-a-livre/boite-a-livre-detail/boite-a-livre-detail.component";
import {
  BoiteALivreFormComponent
} from "./feature/boite-a-livre/boite-a-livre-form/boite-a-livre-form.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'boite-a-livres', component: BoiteALivreListComponent},
  {path: 'boite-a-livres/add', component: BoiteALivreFormComponent, canActivate: [needLoginGuard]},
  {path: 'boite-a-livres/:id', component: BoiteALivreDetailComponent},
  {path: 'boite-a-livres/:id/edit', component: BoiteALivreFormComponent, canActivate: [needLoginGuard]},
  {path: 'boite-a-livres/:id/reservation', component: ReservationFormComponent, canActivate: [needLoginGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'map', component: MapComponent},
  {path: 'reservation', component: ReservationFormComponent},
  {path: 'login', component: LoginComponent, canActivate: [needLogOutGuard]},
  {path: 'logout', component: LoginComponent, canActivate: [needLoginGuard]},
  {path: '**', redirectTo: ''}
];
