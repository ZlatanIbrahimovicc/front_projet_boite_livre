import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

export class Service {
  protected API_URL : string = 'http://localhost:8080';
  protected API_ENTITY_NAME : string = '';
  protected handleError: any;

  constructor(protected readonly http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(entity: any): Observable<any> {
    return this.http.post(`${this.API_URL}/${this.API_ENTITY_NAME}`, entity)
      .pipe(catchError(this.handleError));
  }

  update(entity: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${this.API_ENTITY_NAME}/{entity.id}`, entity)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
