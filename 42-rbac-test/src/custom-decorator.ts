import { SetMetadata } from '@nestjs/common';

export const NotRequireLogin = () => SetMetadata('not-require-login', true);

export const RequirePermission = (...permissions: string[]) =>
  SetMetadata('require-permission', permissions);
