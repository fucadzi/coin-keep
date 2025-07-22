'use client';

import { useState } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { useAuthStore } from '@/lib/store/useAuthStore';

interface LoginFormProps {
    onOTPRequired: (email: string) => void;
    onError: (error: string) => void;
}

export function LoginForm({ onOTPRequired, onError }: LoginFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await login(formData.email, formData.password);
            if (response.requiresOTP) {
                onOTPRequired(formData.email);
            }
        } catch (error) {
            onError(error instanceof Error ? error.message : 'Failed to login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="space-y-2">
                <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                />
            </div>
            <div className="space-y-2">
                <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                />
            </div>
            <Button type="submit" color="primary" className="w-full" isLoading={isLoading}>
                Login
            </Button>

            <div className="text-sm text-gray-500 text-center space-y-1">
                <p>Demo credentials:</p>
                <p>Member: member@valid.email / Member123!</p>
                <p>Partner: partner@valid.email / Partner123!</p>
            </div>
        </form>
    );
}
