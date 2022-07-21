export class UserModel {
    id: number;
    name: string;
    login: string;

    public constructor(_id: number, _name: string, _login: string) {
        this.id = _id;
        this.name = _name;
        this.login = _login;
    }
}