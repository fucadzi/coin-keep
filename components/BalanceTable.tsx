'use client';

import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
import { Spinner } from '@heroui/spinner';
import { useInfiniteScroll } from '@heroui/use-infinite-scroll';
import { useAsyncList } from '@react-stately/data';
import Link from 'next/link';
import { TransformedBalance, SortDescriptor } from '@/types/balance';

interface BalanceTableProps {
    data: TransformedBalance[];
    isLoading: boolean;
}

export function BalanceTable({ data, isLoading }: BalanceTableProps) {
    const [hasMore, setHasMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    let list = useAsyncList<TransformedBalance>({
        async load({ cursor }) {
            const pageSize = 10;
            const currentPage = cursor ? parseInt(cursor) : 0;

            // Filter items based on search query
            let filteredItems = searchQuery
                ? data.filter((item) =>
                      item.currencyCode.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                : data;

            const items = filteredItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
            const nextCursor = items.length === pageSize ? (currentPage + 1).toString() : undefined;

            setHasMore(!!nextCursor);

            return {
                items,
                cursor: nextCursor,
            };
        },
        async sort({
            items,
            sortDescriptor,
        }: {
            items: TransformedBalance[];
            sortDescriptor: SortDescriptor;
        }) {
            return {
                items: items.sort((a, b) => {
                    let first = a[sortDescriptor.column];
                    let second = b[sortDescriptor.column];
                    let cmp =
                        (parseInt(first.toString()) || first) <
                        (parseInt(second.toString()) || second)
                            ? -1
                            : 1;

                    if (sortDescriptor.direction === 'descending') {
                        cmp *= -1;
                    }

                    return cmp;
                }),
            };
        },
    });

    const [loaderRef, scrollerRef] = useInfiniteScroll({
        hasMore,
        onLoadMore: list.loadMore,
    });

    // Reload list when data changes
    useEffect(() => {
        list.reload();
    }, [searchQuery, data]);

    if (isLoading || !data.length) {
        return (
            <div data-testid="loading-skeleton" className="w-full max-w-4xl space-y-4">
                <div className="h-[52px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />{' '}
                {/* Search input skeleton */}
                <div className="h-[520px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />{' '}
                {/* Table skeleton */}
            </div>
        );
    }

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
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort}
            >
                <TableHeader>
                    <TableColumn key="currencyCode" allowsSorting>
                        Currency
                    </TableColumn>
                    <TableColumn key="amount" allowsSorting>
                        Amount
                    </TableColumn>
                </TableHeader>
                <TableBody
                    items={list.items}
                    loadingContent={<Spinner />}
                    emptyContent={<div className="text-center py-4">No results found</div>}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Link
                                    href={`/currency/${item.currencyId}`}
                                    className="text-primary hover:underline"
                                >
                                    {item.currencyCode}
                                </Link>
                            </TableCell>
                            <TableCell>{`${item.currencySymbol} ${item.amount}`}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
