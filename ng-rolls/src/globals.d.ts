export { };
declare global {
    interface Array<T> {
        (newArray: Array<T>): void;
        LeadToSimilarityWithBlacklist(newArray: Array<T>): void;
        LeadToSimilarityWithBlacklist(newArray: Array<T>, nameIgnoredFields: string): void;
        LeadToSimilarityWithBlacklist(newArray: Array<T>, nameIgnoredFields: string[]): void;
    }
}