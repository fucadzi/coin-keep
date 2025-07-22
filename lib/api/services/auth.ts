// Mock data
const MOCK_USERS = [
    {
        id: '1',
        email: 'member@valid.email',
        password: 'Member123!',
        type: 'member',
        otp: '151588',
    },
    {
        id: '2',
        email: 'partner@valid.email',
        password: 'Partner123!',
        type: 'partner',
        otp: '262699',
    },
];

const MOCK_DELAY = 500; // 0.5 second delay to simulate API call

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

// Helper to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        await delay(MOCK_DELAY);

        const user = MOCK_USERS.find((u) => u.email === credentials.email);

        if (!user || user.password !== credentials.password) {
            throw new Error('Invalid email or password');
        }

        // Always require OTP in this mock implementation
        return {
            requiresOTP: true,
            user: {
                id: user.id,
                email: user.email,
                type: user.type,
            },
        };
    },

    async verifyOTP({ email, otp }: OTPVerification): Promise<LoginResponse> {
        await delay(MOCK_DELAY);

        const user = MOCK_USERS.find((u) => u.email === email);

        if (!user) {
            throw new Error('User not found');
        }

        // Check if OTP matches the user's OTP
        if (otp !== user.otp) {
            throw new Error('Invalid OTP code');
        }

        const token = `mock-jwt-token-${Math.random()}`;

        // Store auth data in localStorage
        localStorage.setItem(
            'auth',
            JSON.stringify({
                user: {
                    id: user.id,
                    email: user.email,
                    type: user.type,
                },
                token,
            })
        );

        return {
            requiresOTP: false,
            user: {
                id: user.id,
                email: user.email,
                type: user.type,
            },
            token,
        };
    },

    async logout(): Promise<void> {
        await delay(MOCK_DELAY);
        localStorage.removeItem('auth');
    },

    async getCurrentUser(): Promise<User> {
        await delay(MOCK_DELAY);

        const auth = localStorage.getItem('auth');
        if (!auth) {
            throw new Error('Not authenticated');
        }

        const { user } = JSON.parse(auth);
        if (!user) {
            throw new Error('Not authenticated');
        }

        return user;
    },

    isAuthenticated(): boolean {
        const auth = localStorage.getItem('auth');
        return !!auth;
    },
};
