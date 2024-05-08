import { Exclude, Expose, Transform } from 'class-transformer';

export class User {
  id: number;

  username: string;

  @Exclude() // 标记排除字段， 使用 class-transformer 序列化entity时会忽略该字段
  password: string;

  @Expose() // 标记导出字段， 这个字段是只读的 使用 class-transformer 序列化entity时会包含该字段
  get xxx(): string {
    return `${this.username} ${this.email}`;
  }

  // 对返回的字段值做一些转换。
  @Transform(({ value }) => '邮箱是：' + value)
  email: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}