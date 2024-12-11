import { Routes } from '@angular/router';
import {TableauComponent} from "./feature/tableau/tableau.component";
import {HomeComponent} from "./feature/home/home.component";
import {MapComponent} from "./feature/map/map.component";
import {ReservationFormComponent} from "./feature/Reservation/Reservation.component";
import {FormulaireComponent} from "./feature/formulaire/formulaire.component";
import {needLoginGuard, needLogOutGuard} from "./shared/auth/auth.guard";
import {LoginComponent} from "./feature/login/login.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'boite-a-livres', component: TableauComponent},
  {path: 'boite-a-livres/:id', component: TableauComponent, canActivate: [needLoginGuard]},
  {path: 'boite-a-livres/:id/edit', component: FormulaireComponent, canActivate: [needLoginGuard]},
  {path: 'boite-a-livres/:id/reservation', component: FormulaireComponent, canActivate: [needLoginGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'map', component: MapComponent},
  {path: 'reservation', component: ReservationFormComponent},
  {path: 'login', component: LoginComponent, canActivate: [needLogOutGuard]},
  {path: 'logout', component: LoginComponent, canActivate: [needLoginGuard]},
  {path: '**', redirectTo: ''}
];
