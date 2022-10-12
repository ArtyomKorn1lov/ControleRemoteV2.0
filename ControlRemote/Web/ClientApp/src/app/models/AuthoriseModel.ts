export class AuthoriseModel {
    name: string;
    type: string;

    public constructor(_name: string, _type: string) {
        this.name = _name;
        this.type = _type;
    }
}