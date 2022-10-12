export class EmployerCreateModel {
    managerId: number;
    name: string;
    login: string;

    public constructor(_managerId: number, _name: string, _login: string) {
        this.managerId = _managerId;
        this.name = _name;
        this.login = _login;
    }
}