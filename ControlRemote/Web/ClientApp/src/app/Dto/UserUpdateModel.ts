export class UserUpdateModel {
    id: number;
    name: string;
    login: string;
    password: string;

    public constructor(_id: number, _name: string, _login: string, _password: string) {
        this.id = _id;
        this.name = _name;
        this.login = _login;
        this.password = _password;
    }
}