import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpSuccessResponse } from './../interfaces';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(public http: HttpClient) {
    console.log('persona service');
  }

  getAllPersonas(): Observable<HttpSuccessResponse> {
    return this.http.get<HttpSuccessResponse>(`${environment.baseUrl}/api/personas`);
  }

  getPersona(id: string): Observable<HttpSuccessResponse> {
    return this.http.get<HttpSuccessResponse>(`${environment.baseUrl}/api/personas/${id}`);
  }
}
