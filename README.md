# Aplicação Persona SPA Ionic

Aplicação para gerar fichas de personagem de RPG que seguem as regras de "Mutantes e Malfeitores".

Sendo uma interface interativa para consumir a [API Persona Laravel](https://github.com/gabriel-fn/persona-laravel). 

Para saber mais, veja esse [vídeo de apresentação do funcionamento da aplicação](https://warcontent.com/materiais/projeto-persona/).

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **Instalação** para saber como implantar o projeto.

### 🛠️ Construído com

* [Angular v8.2.14](https://angular.io/) - O framework web usado
* [Ionic v5.5.1](https://ionicframework.com/) - O framework para Hybrid Apps

### 🔧 Instalação

* [Baixe o instalador](https://nodejs.org/) do Node LTS.
* Instale o ionic CLI globalmente: `npm install -g ionic`
* Clone esse repositório: `git clone https://github.com/gabriel-fn/persona-ionic4.git`
* Execute `npm install` na raiz do projeto.
* Execute `ionic serve` no terminal na raiz do projeto.
* Pronto. :tada:

## 📦 Desenvolvimento

Algumas informações adicionais para implantar a aplicação em um sistema ativo.

Nas variáveis de **environment.ts** (**environment.prod.ts** para produção) você deve configurar a url base onde se encontra a [API Persona Laravel](https://github.com/gabriel-fn/persona-laravel) que alimenta essa aplicação:

```
export const environment = {
  ...
  baseUrl: 'http://localhost:8000',
  ...
};
```

Também nas variáveis de **environment.ts** (**environment.prod.ts** para produção) você deve configurar o [Laravel Passport](https://laravel.com/docs/5.8/passport), pacote oficial do [framework laravel](https://laravel.com/docs/5.8) para autenticação de usuários na aplicação (usado na [API Persona Laravel](https://github.com/gabriel-fn/persona-laravel)): 

```
export const environment = {
  ...
  grant_type: "password",
  client_id: 2,
  client_secret: "Yvn8jlQ6Zrqc9lDu9MtShNA3N4G0Qv7adQu4Hsa2",
  scope: "",
  ...
};
```

* Leia a [documentação do Laravel Passport](https://laravel.com/docs/5.8/passport) para saber como funciona esse recurso. 

## ⚙️ Deploying

### Progressive Web App

1. Retire os comentários [dessas linhas](https://github.com/ionic-team/ionic2-app-base/blob/master/src/index.html#L21)
2. Execute `npm run ionic:build --prod`
3. Coloque sua pasta `www` no seu serviço de hospedagem

### Android

1. Execute `ionic cordova run android --prod`

### iOS

1. Execute `ionic cordova run ios --prod`

---
⌨️ com ❤️ por [Gabriel Nascimento](https://www.linkedin.com/in/gabriel-fn/) 😊
