export declare function definePattern<P, R>(): <T extends {
    pattern: string;
    queue?: string;
    description?: string;
}>(def: T) => T & {
    __payloadType?: P;
    __responseType?: R;
};
