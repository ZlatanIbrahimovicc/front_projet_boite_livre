import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Reservation, ReservationDTO} from '../models/reservation';
import {Service} from "./service";

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends Service {
  constructor(protected override http: HttpClient) {
    super(http);
    this.API_ENTITY_NAME = 'reservations';
  }

  override getAll(): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }

  override create(entity: any): Observable<any> {
    return this.http.post(`${this.API_URL}/${this.API_ENTITY_NAME}`, entity);
  }
}
