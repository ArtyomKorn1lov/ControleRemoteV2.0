export class LoginModel {
    login: string;
    password: string;

    public constructor(_login: string, _password: string) {
        this.login = _login;
        this.password = _password;
    }
}