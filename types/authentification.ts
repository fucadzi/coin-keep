export interface LoginCredentials {
    email: string;
    password: string;
}

export interface OTPVerification {
    email: string;
    otp: string;
}

export interface User {
    id: string;
    email: string;
    type: string;
}

export interface LoginResponse {
    requiresOTP: boolean;
    user?: User;
    token?: string;
}
