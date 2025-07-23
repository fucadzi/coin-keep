import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '../useAuthStore';

describe('useAuthStore', () => {
    beforeEach(() => {
        useAuthStore.setState({
            isAuthenticated: false,
            user: null,
            error: null,
        });
    });

    it('should start with initial state', () => {
        const { result } = renderHook(() => useAuthStore());

        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.user).toBeNull();
        expect(result.current.error).toBeNull();
    });

    it('should handle login with valid credentials', async () => {
        const { result } = renderHook(() => useAuthStore());

        await act(async () => {
            await result.current.login('member@valid.email', 'Member123!');
        });

        expect(result.current.error).toBeNull();
        expect(result.current.isAuthenticated).toBe(false); // false because OTP is required
    });

    it('should handle login with invalid credentials', async () => {
        const { result } = renderHook(() => useAuthStore());

        await expect(async () => {
            await act(async () => {
                await result.current.login('wrong@email.com', 'WrongPass123!');
            });
        }).rejects.toThrow('Invalid email or password');

        expect(result.current.isAuthenticated).toBe(false);
    });

    it('should verify OTP successfully', async () => {
        const { result } = renderHook(() => useAuthStore());

        await act(async () => {
            await result.current.login('member@valid.email', 'Member123!');
            await result.current.verifyOTP('member@valid.email', '151588');
        });

        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.user).toBeTruthy();
        expect(result.current.error).toBeNull();
    });

    it('should handle invalid OTP', async () => {
        const { result } = renderHook(() => useAuthStore());

        await act(async () => {
            await result.current.login('member@valid.email', 'Member123!');
        });

        await expect(async () => {
            await act(async () => {
                await result.current.verifyOTP('member@valid.email', '000000');
            });
        }).rejects.toThrow('Invalid OTP code');

        expect(result.current.isAuthenticated).toBe(false);
    });

    it('should handle logout', async () => {
        const { result } = renderHook(() => useAuthStore());

        // First login and verify
        await act(async () => {
            await result.current.login('member@valid.email', 'Member123!');
            await result.current.verifyOTP('member@valid.email', '151588');
        });

        expect(result.current.isAuthenticated).toBe(true);

        // Then logout
        await act(async () => {
            await result.current.logout();
        });

        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.user).toBeNull();
    });
});
