import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import {Service} from "./service";

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends Service {
  constructor(protected override http: HttpClient) {
    super(http);
    this.API_ENTITY_NAME = 'users';
  }

  override getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }

  override create(user: { name: string; id: number }): Observable<Object> {
    return this.http.post(`${this.API_URL}/${this.API_ENTITY_NAME}`, user);
  }
}
