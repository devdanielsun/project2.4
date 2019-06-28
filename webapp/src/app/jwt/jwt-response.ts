export interface JwtResponseI {
    userId: number;
    tokenValid: boolean;
    newToken: string;
    message: string;
    admin: boolean;
}
