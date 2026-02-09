export declare const RESPONSE_MESSAGE = "response_message";
export declare const STATUS_CODES = "status_code";
export declare const ApiResponse: (message: string, status: number) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
