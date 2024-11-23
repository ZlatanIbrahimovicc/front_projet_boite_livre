import { Routes } from '@angular/router';
import {TableauComponent} from "./feature/tableau/tableau.component";
import {HomeComponent} from "./feature/home/home.component";
import {MapComponent} from "./feature/map/map.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'tableau', component: TableauComponent},
  {path: 'home', component: HomeComponent},
  {path: 'map', component: MapComponent},
  {path: '**', redirectTo: ''}
];
