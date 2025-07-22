'use client';

import { useState } from 'react';
import { Button } from '@heroui/button';
import { authService } from '@/lib/api/services/auth';

interface LogoutButtonProps {
    onLogout: () => void;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await authService.logout();
            onLogout();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button color="danger" variant="light" isLoading={isLoading} onClick={handleLogout}>
            Logout
        </Button>
    );
}
