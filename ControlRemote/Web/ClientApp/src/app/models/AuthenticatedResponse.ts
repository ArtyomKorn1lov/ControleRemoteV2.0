export class AuthenticatedResponse {
    token: string;

    public constructor(_token: string) {
        this.token = _token;
    }
}