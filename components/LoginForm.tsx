'use client';

import { useState } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';

interface LoginFormProps {
    onSubmit: (email: string, password: string) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await onSubmit(formData.email, formData.password);
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
            <Button
                type="submit"
                color="primary"
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                isLoading={isLoading}
            >
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
