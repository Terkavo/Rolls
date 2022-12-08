export { };
declare global {
    interface Array<T> {
        СombineOnField(arr: Array<T>, field: string): void
        Exists(fn: (x: T) => boolean): boolean;
        Remove(el: T): boolean;
        RemoveAll(fn: (x: T) => boolean): void
        RemoveAllElements(el: T): void
        PushArray(arr: T[]): void;
    }
    interface Date {
        FormatDDMMYYYY(): string;
    }
    interface DateConstructor {
        FromDDMMYYYY(val: string): Date;
    }
}