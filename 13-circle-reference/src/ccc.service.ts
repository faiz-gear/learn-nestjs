import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { DddService } from './ddd.service';

@Injectable()
export class CccService {
  constructor(
    // 解决Service循环依赖问题
    @Inject(forwardRef(() => DddService)) private dddService: DddService,
  ) {}

  ccc() {
    return 'ccc';
  }

  eee() {
    return this.dddService.ddd() + 'eee';
  }
}
