import { Routes } from '@angular/router';
import {TableauComponent} from "./tableau/tableau.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'tableau', component: TableauComponent},
  {path: 'home', component: HomeComponent}
];
