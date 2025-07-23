'use client';

import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { OTPForm } from './OTPForm';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useBalanceStore } from '@/lib/store/useBalanceStore';
import { useCurrencyStore } from '@/lib/store/useCurrencyStore';

interface AuthProps {
    onAuthSuccess: () => void;
}

type AuthStep = 'login' | 'otp';

export function Auth({ onAuthSuccess }: AuthProps) {
    const [step, setStep] = useState<AuthStep>('login');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const login = useAuthStore((state) => state.login);
    const verifyOTP = useAuthStore((state) => state.verifyOTP);
    const fetchBalances = useBalanceStore((state) => state.fetchBalances);
    const fetchCurrencies = useCurrencyStore((state) => state.fetchCurrencies);

    const handleError = (errorMessage: string) => {
        setError(errorMessage);
        // Clear error after 5 seconds
        setTimeout(() => setError(''), 5000);
    };

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await login(email, password);
            if (response.requiresOTP) {
                setEmail(email);
                setStep('otp');
            }
        } catch (error) {
            handleError(error instanceof Error ? error.message : 'Failed to login');
        }
    };

    const handleOTPVerify = async (otp: string) => {
        try {
            await verifyOTP(email, otp);
            // Fetch data after successful verification
            await Promise.all([fetchBalances(), fetchCurrencies()]);
            onAuthSuccess();
        } catch (error) {
            handleError(error instanceof Error ? error.message : 'Failed to verify OTP');
        }
    };

    const handleBack = () => {
        setStep('login');
        setError('');
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="flex flex-col items-center gap-4 pb-8 pt-6 px-6">
                <h2 className="text-2xl font-bold">Welcome to CoinKeep</h2>
                {error && (
                    <div className="w-full p-3 text-sm text-white bg-red-500 rounded-lg">
                        {error}
                    </div>
                )}
            </div>
            <div className="px-6 pb-6">
                {step === 'login' ? (
                    <LoginForm onSubmit={handleLogin} />
                ) : (
                    <OTPForm email={email} onSubmit={handleOTPVerify} onBack={handleBack} />
                )}
            </div>
        </div>
    );
}
