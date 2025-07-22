export interface TransformedBalance {
    id: string;
    amount: number;
    currencyId: string;
    currencyCode: string;
    currencySymbol: string;
    [key: string]: string | number;
}

export type SortDescriptor = {
    column: keyof TransformedBalance;
    direction: 'ascending' | 'descending';
};
