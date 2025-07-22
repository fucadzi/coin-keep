'use client';

import { useEffect } from 'react';
import { BalanceTable } from '@/components/BalanceTable';
import { Auth } from '@/components/Auth';
import { useCurrencyStore } from '@/lib/store/useCurrencyStore';
import { useBalanceStore } from '@/lib/store/useBalanceStore';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function Home() {
    const { isAuthenticated, checkAuth } = useAuthStore();
    const { error: currenciesError, fetchCurrencies } = useCurrencyStore();
    const { error: balancesError, fetchBalances } = useBalanceStore();

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // Fetch data only when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchCurrencies();
            fetchBalances();
        }
    }, [isAuthenticated, fetchCurrencies, fetchBalances]);

    if (currenciesError || balancesError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-red-500">
                    <h2 className="text-xl font-semibold mb-2">Error</h2>
                    <p>{currenciesError || balancesError}</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center p-4">
                <Auth onAuthSuccess={checkAuth} />
            </div>
        );
    }

    return (
        <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
            <div className="inline-block max-w-xl text-center justify-center">
                <h1 className="text-4xl font-bold">Welcome to CoinKeep!</h1>
            </div>

            <div className="w-full max-w-4xl">
                <BalanceTable />
            </div>
        </section>
    );
}
