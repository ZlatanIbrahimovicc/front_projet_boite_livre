import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import {Service} from "./service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends Service {

  constructor(protected override http: HttpClient) {
    super(http);
    this.API_ENTITY_NAME = 'users';
  }

  override getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }

  override create(entity: any): Observable<any> {
    return this.http.post(`${this.API_URL}/${this.API_ENTITY_NAME}`, entity);
  }
  override delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }
  //override update(entity: any): Observable<any> {
  //  return super.update(entity);
  //}
  override update(entity: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${this.API_ENTITY_NAME}`, entity);
  }
}
