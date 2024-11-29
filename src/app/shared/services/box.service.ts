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
    return super.getAll();
  }

  override getById(id: number): Observable<Box> {
    return super.getById(id);
  }

  override create(entity: any): Observable<any> {
    return super.create(entity);
  }

  override update(entity: any): Observable<any> {
    return super.update(entity);
  }

  override delete(id: number): Observable<any> {
    return super.delete(id);
  }
}
