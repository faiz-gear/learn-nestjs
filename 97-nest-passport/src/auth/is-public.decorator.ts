import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'is-public';
export const Public = (...args: string[]) => SetMetadata(IS_PUBLIC_KEY, args);
