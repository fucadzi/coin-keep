'use client';

import { useEffect } from 'react';
import { useBalanceStore } from '@/lib/store/useBalanceStore';
import { useCurrencyStore } from '@/lib/store/useCurrencyStore';

export function BalanceList() {
    const {
        balances,
        loading: balancesLoading,
        error: balancesError,
        fetchBalances,
    } = useBalanceStore();
    const {
        currencies,
        loading: currenciesLoading,
        error: currenciesError,
        fetchCurrencies,
    } = useCurrencyStore();

    useEffect(() => {
        fetchBalances();
        fetchCurrencies();
    }, [fetchBalances, fetchCurrencies]);

    if (balancesLoading || currenciesLoading) return <div>Loading...</div>;
    if (balancesError || currenciesError)
        return <div>Error: {balancesError || currenciesError}</div>;

    // Create a map of currencies for easy lookup
    const currencyMap = currencies.reduce(
        (acc, currency) => {
            acc[currency.id] = currency;
            return acc;
        },
        {} as Record<string, (typeof currencies)[0]>
    );

    return (
        <div className="w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Your Balances</h2>
            <ul className="space-y-2">
                {balances.map((balance) => {
                    console.log('balance', balance);
                    const currency = currencyMap[balance.currency_id];
                    console.log('currency', currency);
                    return (
                        <li
                            key={balance.id}
                            className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                        >
                            <span>{currency?.code}</span>
                            <span className="font-medium">
                                {currency?.symbol} {balance.amount}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
