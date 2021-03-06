// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,

  // VARIÁVEIS ESSENCIAIS PARA A APLICAÇÃO
  baseUrl: 'http://localhost:8000',
  
  /*
  * VARIÁVEIS DA API DE AUTENTICAÇÃO PASSPORT
  * Todas as configurações devem estar de acordo com o cliente gerado pela API.
  * Se não souber suas configurações, consulte o banco de dados
  */
  grant_type: "password",
  client_id: 2,
  client_secret: "Yvn8jlQ6Zrqc9lDu9MtShNA3N4G0Qv7adQu4Hsa2",
  scope: ""
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
