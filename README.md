# Aplicação Persona SPA Ionic

Aplicação para gerar fichas de personagem de RPG que seguem as regras de "Mutantes e Malfeitores".

Sendo uma interface interativa para consumir a [API Persona Laravel](https://github.com/warcontent/persona-laravel). 

Projeto produzido com Ionic v5.5.1 e Angular v8.2.14.

## Getting Started

* [Baixe o instalador](https://nodejs.org/) do Node LTS.
* Instale o ionic CLI globalmente: `npm install -g ionic`
* Clone esse repositório: `git clone https://github.com/warcontent/persona-ionic4.git`.
* Execute `npm install` na raiz do projeto.
* Execute `ionic serve` no terminal na raiz do projeto.
* Pronto. :tada:

## Deploying

### Progressive Web App

1. Retire os comentários [dessas linhas](https://github.com/ionic-team/ionic2-app-base/blob/master/src/index.html#L21)
2. Execute `npm run ionic:build --prod`
3. Coloque sua pasta `www` no seu serviço de hospedagem

### Android

1. Execute `ionic cordova run android --prod`

### iOS

1. Execute `ionic cordova run ios --prod`
