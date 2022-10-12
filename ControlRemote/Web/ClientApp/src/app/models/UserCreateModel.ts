export class UserCreateModel {
    name: string;
    login: string;
    password: string;

    public constructor(_name: string, _login: string, _password: string) {
        this.name = _name;
        this.login = _login;
        this.password = _password;
    }
}