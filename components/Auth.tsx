'use client';

import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { OTPForm } from './OTPForm';

interface AuthProps {
    onAuthSuccess: () => void;
}

type AuthStep = 'login' | 'otp';

export function Auth({ onAuthSuccess }: AuthProps) {
    const [step, setStep] = useState<AuthStep>('login');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleError = (errorMessage: string) => {
        setError(errorMessage);
        // Clear error after 5 seconds
        setTimeout(() => setError(''), 5000);
    };

    const handleOTPRequired = (email: string) => {
        setEmail(email);
        setStep('otp');
        setError('');
    };

    const handleBack = () => {
        setStep('login');
        setError('');
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
            <div className="flex flex-col items-center gap-4 pb-8 pt-6 px-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold">Welcome to CoinKeep</h2>
                {error && (
                    <div className="w-full p-3 text-sm text-white bg-red-500 rounded-lg">
                        {error}
                    </div>
                )}
            </div>
            <div className="px-6 pb-6">
                {step === 'login' ? (
                    <LoginForm onOTPRequired={handleOTPRequired} onError={handleError} />
                ) : (
                    <OTPForm
                        email={email}
                        onSuccess={onAuthSuccess}
                        onError={handleError}
                        onBack={handleBack}
                    />
                )}
            </div>
        </div>
    );
}
