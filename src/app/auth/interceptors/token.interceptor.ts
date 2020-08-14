import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { Token } from '../interfaces/token';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor (public injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authProvider: AuthService = this.injector.get(AuthService);
    return from(authProvider.getToken()).pipe(switchMap((token: Token) => {
      if(token){
        console.log(`token interceptado: ${token}`);
        req = req.clone({
          setHeaders: {
            'Accept' : 'application/json',
            'Authorization' : `${token.token_type} ${token.access_token}`
          }
        });
      }
      return next.handle(req);
    }));
  }
}