import { PipeTransform, type ArgumentMetadata } from '@nestjs/common';
import { type ZodSchema } from 'zod';
export declare class ZodValidationPipe implements PipeTransform {
    private readonly schema;
    constructor(schema: ZodSchema);
    transform(value: unknown, _metadata: ArgumentMetadata): unknown;
}
