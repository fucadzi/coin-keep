'use client';

import { useEffect } from 'react';
import { BalanceTable } from '@/components/BalanceTable';
import { useCurrencyStore } from '@/lib/store/useCurrencyStore';
import { useBalanceStore } from '@/lib/store/useBalanceStore';

export default function Home() {
    const {
        loading: currenciesLoading,
        error: currenciesError,
        fetchCurrencies,
    } = useCurrencyStore();
    const { loading: balancesLoading, error: balancesError, fetchBalances } = useBalanceStore();

    useEffect(() => {
        fetchCurrencies();
        fetchBalances();
    }, [fetchCurrencies, fetchBalances]);

    if (currenciesLoading || balancesLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Loading...</h2>
                    <p className="text-gray-500">Fetching your financial data</p>
                </div>
            </div>
        );
    }

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
