declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_URL: string;
        // Add other env variables here
        NODE_ENV: 'development' | 'production' | 'test';
    }
}
