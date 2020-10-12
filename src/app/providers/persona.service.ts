import { Persona } from './../interfaces/persona';
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

  get(id: string): Observable<HttpSuccessResponse> {
    return this.http.get<HttpSuccessResponse>(`${environment.baseUrl}/api/personas/${id}`);
  }

  save(persona: Persona): Observable<HttpSuccessResponse> {
    if(persona.id){
      return this.http.put<HttpSuccessResponse>(`${environment.baseUrl}/api/personas/${persona.id}`, persona);
    }else{
      return this.http.post<HttpSuccessResponse>(`${environment.baseUrl}/api/personas`, persona);
    }
  }

  delete(id: number): Observable<HttpSuccessResponse> {
    return this.http.delete<HttpSuccessResponse>(`${environment.baseUrl}/api/personas/${id}`);
  }

}
