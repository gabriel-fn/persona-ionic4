import { environment } from './../../../environments/environment';


export class PasswordClient {
    grant_type: string = environment.grant_type;
    client_id: number = environment.client_id;
    client_secret: string = environment.client_secret;

    username: string;
    password: string;
    scope: string = environment.scope;

    constructor(username: string, password: string) {
        this.username = username;
        this.password =  password;
    }
}