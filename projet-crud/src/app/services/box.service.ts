import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Box } from '../models/box';
import {Service} from "./service";

@Injectable({
  providedIn: 'root'
})
export class BoxService extends Service {
  constructor(protected override http: HttpClient) {
    super(http);
    this.API_ENTITY_NAME = 'boxes';
  }

  override getAll(): Observable<Box[]> {
    return this.http.get<Box[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }

  override create(box: { name: string; id: number }): Observable<Object> {
    return this.http.post(`${this.API_URL}/&{this.API_ENTITY_NAME}`, box);
  }
}
