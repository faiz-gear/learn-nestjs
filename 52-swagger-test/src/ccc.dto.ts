import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// DTO: 数据传输对象, 用于后端接口传输数据
export class CccDto {
  @ApiProperty({ name: 'aaa', description: 'aaa', enum: ['a1', 'a2', 'a3'] })
  aaa: string;

  @ApiPropertyOptional({ name: 'bbb' })
  bbb: number;

  @ApiProperty({ name: 'ccc', type: [String] })
  ccc: Array<string>;
}

// Vo: 视图对象, 用于返回给前端的数据

export class CccVo {
  @ApiProperty({ name: 'aaa' })
  aaa: number;

  @ApiProperty({ name: 'bbb' })
  bbb: number;
}
