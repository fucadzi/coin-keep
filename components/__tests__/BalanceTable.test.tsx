import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import { BalanceTable } from '../BalanceTable';
import { TransformedBalance } from '@/types/balance';

const mockData: TransformedBalance[] = [
    {
        id: '1',
        amount: 1000,
        currencyId: 'usd',
        currencyCode: 'USD',
        currencySymbol: '$',
    },
    {
        id: '2',
        amount: 500,
        currencyId: 'eur',
        currencyCode: 'EUR',
        currencySymbol: '€',
    },
    {
        id: '3',
        amount: 2000,
        currencyId: 'gbp',
        currencyCode: 'GBP',
        currencySymbol: '£',
    },
];

describe('BalanceTable', () => {
    it('renders loading skeleton when loading', async () => {
        await act(async () => {
            render(<BalanceTable data={[]} isLoading={true} />);
        });

        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

    it('renders table with data when not loading', async () => {
        await act(async () => {
            render(<BalanceTable data={mockData} isLoading={false} />);
        });

        // Check if all currencies are displayed
        await waitFor(() => {
            expect(screen.getByText('USD')).toBeInTheDocument();
            expect(screen.getByText('EUR')).toBeInTheDocument();
            expect(screen.getByText('GBP')).toBeInTheDocument();
        });

        // Check if amounts with symbols are displayed
        await waitFor(() => {
            expect(screen.getByText('$ 1000')).toBeInTheDocument();
            expect(screen.getByText('€ 500')).toBeInTheDocument();
            expect(screen.getByText('£ 2000')).toBeInTheDocument();
        });
    });

    it('filters data based on search input', async () => {
        await act(async () => {
            render(<BalanceTable data={mockData} isLoading={false} />);
        });

        const searchInput = screen.getByPlaceholderText(/search by currency/i);

        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'USD' } });
        });

        await waitFor(() => {
            expect(screen.getByText('USD')).toBeInTheDocument();
            expect(screen.queryByText('EUR')).not.toBeInTheDocument();
            expect(screen.queryByText('GBP')).not.toBeInTheDocument();
        });
    });
});
