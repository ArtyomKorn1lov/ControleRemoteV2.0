export class EmployerModel {
    id: number;
    managerId: number;
    name: string;
    login: string;

    public constructor(_id: number, _managerId: number, _name: string, _login: string) {
        this.id = _id;
        this.managerId = _managerId;
        this.name = _name;
        this.login = _login;
    }
}