'use client';

import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
import { Spinner } from '@heroui/spinner';
import { useInfiniteScroll } from '@heroui/use-infinite-scroll';
import { useAsyncList } from '@react-stately/data';
import { useBalanceStore } from '@/lib/store/useBalanceStore';
import { useCurrencyStore } from '@/lib/store/useCurrencyStore';

interface BalanceTableItem {
    id: string;
    amount: number;
    currencyCode: string;
    currencySymbol: string;
}

export function BalanceTable() {
    const [hasMore, setHasMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { balances } = useBalanceStore();
    const { currencies } = useCurrencyStore();

    // Create currency map for lookups
    const currencyMap = currencies.reduce(
        (acc, currency) => {
            acc[currency.id] = currency;
            return acc;
        },
        {} as Record<string, (typeof currencies)[0]>
    );

    let list = useAsyncList<BalanceTableItem>({
        async load({ cursor }) {
            const pageSize = 10;
            const currentPage = cursor ? parseInt(cursor) : 0;

            // Transform balances
            let allItems = balances.map((balance) => {
                const currency = currencyMap[balance.currency_id];
                return {
                    id: balance.id,
                    amount: balance.amount,
                    currencyCode: currency?.code || 'Unknown',
                    currencySymbol: currency?.symbol || '',
                };
            });

            // Filter items based on search query
            if (searchQuery) {
                allItems = allItems.filter((item) =>
                    item.currencyCode.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            const items = allItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
            const nextCursor = items.length === pageSize ? (currentPage + 1).toString() : undefined;

            setHasMore(!!nextCursor);

            return {
                items,
                cursor: nextCursor,
            };
        },
    });

    const [loaderRef, scrollerRef] = useInfiniteScroll({
        hasMore,
        onLoadMore: list.loadMore,
    });

    // Reload list when search query changes
    useEffect(() => {
        list.reload();
    }, [searchQuery]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by currency..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700"
                    aria-label="Search currencies"
                />
            </div>

            <Table
                isHeaderSticky
                aria-label="Balances table with infinite scroll"
                baseRef={scrollerRef}
                bottomContent={
                    hasMore ? (
                        <div className="flex w-full justify-center">
                            <Spinner ref={loaderRef} />
                        </div>
                    ) : null
                }
                classNames={{
                    base: 'max-h-[520px] overflow-scroll',
                    table: 'min-h-[400px]',
                }}
            >
                <TableHeader>
                    <TableColumn>Currency</TableColumn>
                    <TableColumn>Amount</TableColumn>
                </TableHeader>
                <TableBody items={list.items} loadingContent={<Spinner />}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.currencyCode}</TableCell>
                            <TableCell>{`${item.currencySymbol} ${item.amount}`}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
