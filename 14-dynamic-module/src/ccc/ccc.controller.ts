import { Controller, Get, Inject } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  MODULE_OPTIONS_TOKEN,
} from './ccc.module-definition';

@Controller('ccc')
export class CccController {
  @Inject(MODULE_OPTIONS_TOKEN)
  private readonly options: typeof ASYNC_OPTIONS_TYPE;

  @Get()
  hello() {
    return this.options;
  }
}
