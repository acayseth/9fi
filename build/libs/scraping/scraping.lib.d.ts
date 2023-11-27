export interface IScrapingLink {
    code: number;
    url: string;
}
export declare class Scraping {
    private url;
    private links;
    private tmpLinks;
    constructor(url: string);
    handle(): Promise<IScrapingLink[]>;
}
