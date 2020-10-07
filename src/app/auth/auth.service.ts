import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { Token } from './interfaces/token';
import { environment } from './../../environments/environment';
import { PasswordClient } from './interfaces/password-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly HAS_TOKEN: string = 'persona_token';

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router
  ) { console.log('iniciado serviço auth'); }


  getUser(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/user`);
  }

  /*
  * FUNÇÕES PARA AUTENTICAÇÃO DE USUÁRIOS
  * Dependencia das variáveis de ambiente e o serviço HttpClient
  * Utiliza as funções de armazenamento de Tokens dessa classe
  */

  login(username, password) {
    this.http.post<Token>(`${environment.baseUrl}/oauth/token`, new PasswordClient(username, password))
    .subscribe((token: Token) => {
      console.log(token);
      this.setToken(token).then(() => {
        window.dispatchEvent(new CustomEvent('user:login'));
        this.router.navigateByUrl('');
      });
    });
  }

  logout(): Promise<any> {
    return this.removeToken().then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
      this.router.navigate(['login']);
    });
    
  }

  /*
  * FUNÇÕES PARA ARMAZENAMENTO DE TOKENS
  * Dependencia do serviço Storage Ionic
  * Todas retornam promises
  */

  async isLoggedIn(): Promise<boolean> {
    let token = await this.getToken();
    if (token) {
      return true;
    }
    return false;
  }

  getToken(): Promise<Token> {
    return this.storage.get(this.HAS_TOKEN);
  }

  setToken(token: Token): Promise<any> {
    return this.storage.set(this.HAS_TOKEN, token); 
  }

  removeToken(): Promise<any> {
    return this.storage.remove(this.HAS_TOKEN);
  }

}
