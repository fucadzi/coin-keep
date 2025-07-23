'use client';

import { useState } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';

interface OTPFormProps {
    email: string;
    onSubmit: (otp: string) => Promise<void>;
    onBack: () => void;
}

export function OTPForm({ email, onSubmit, onBack }: OTPFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await onSubmit(otp);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Enter Verification Code</h3>
                <p className="text-sm text-gray-500">Enter the 6-digit code sent to {email}</p>
            </div>

            <div className="space-y-2">
                <Input
                    type="text"
                    label="OTP Code"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    pattern="\d{6}"
                    maxLength={6}
                    required
                />
                <p className="text-xs text-gray-500">
                    For demo: member OTP is 151588, partner OTP is 262699
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <Button
                    type="submit"
                    color="primary"
                    className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    isLoading={isLoading}
                >
                    Verify
                </Button>
                <Button
                    type="button"
                    variant="light"
                    className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    onPress={onBack}
                >
                    Back to Login
                </Button>
            </div>
        </form>
    );
}
