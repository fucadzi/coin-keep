import { BalanceList } from '@/components/BalanceList';

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
            <div className="inline-block max-w-xl text-center justify-center">
                <h1 className="text-4xl font-bold">Welcome to CoinKeep!</h1>
            </div>

            <div className="w-full max-w-4xl">
                <BalanceList />
            </div>
        </section>
    );
}
