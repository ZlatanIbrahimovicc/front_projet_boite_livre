import { Routes } from '@angular/router';
import {TableauComponent} from "./feature/tableau/tableau.component";
import {HomeComponent} from "./feature/home/home.component";
import {MapComponent} from "./feature/map/map.component";
import {FormulaireComponent} from "./feature/formulaire/formulaire.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'boiteALivre', component: TableauComponent},
  {path: 'boiteALivre/:id', component: TableauComponent},
  {path: 'boiteALivre/:id/edit', component: FormulaireComponent},
  {path: 'home', component: HomeComponent},
  {path: 'map', component: MapComponent},
  {path: '**', redirectTo: ''}
];
