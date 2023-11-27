declare const env: {
    parsing: {
        url: string | undefined;
    };
    telegram: {
        token: string | undefined;
        chatId: string | undefined;
    };
    cron: {
        job: string | undefined;
    };
};
export { env };
