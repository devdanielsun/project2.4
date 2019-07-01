export interface JwtResponseI {
    userId: string;
    tokenValid: boolean;
    newToken: string;
    message: string;
    admin: boolean;
}
