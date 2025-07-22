'use client';

import { useBalanceStore } from '@/lib/store/useBalanceStore';
import { useCurrencyStore } from '@/lib/store/useCurrencyStore';
import { use } from 'react';

interface CurrencyPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function CurrencyPage({ params }: CurrencyPageProps) {
    const { id } = use(params);
    const { balances } = useBalanceStore();
    const { currencies } = useCurrencyStore();

    const currency = currencies.find((c) => c.id === id);
    const currencyBalances = balances.filter((b) => b.currency_id.toString() === id);
    const totalAmount = currencyBalances.reduce((sum, b) => Number(sum) + Number(b.amount), 0);

    if (!currency) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center text-red-500">
                    <h2 className="text-xl font-semibold mb-2">Currency not found</h2>
                    <p>The requested currency does not exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold">{currency.code}</h1>
                    <p className="text-gray-500 mt-2">Currency details and balances</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-semibold">
                        {currency.symbol} {totalAmount.toFixed(2)}
                    </p>
                    <p className="text-gray-500 mt-1">Total Balance</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">All Balances</h2>
                {currencyBalances.length > 0 ? (
                    <div className="space-y-4">
                        {currencyBalances.map((balance) => (
                            <div
                                key={balance.id}
                                className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                            >
                                <span className="font-medium">Balance ID: {balance.id}</span>
                                <span className="text-lg">
                                    {currency.symbol} {balance.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8">
                        No balances found for this currency.
                    </p>
                )}
            </div>
        </div>
    );
}
