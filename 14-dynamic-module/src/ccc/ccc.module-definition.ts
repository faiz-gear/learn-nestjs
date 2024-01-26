import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface CccModuleOptions {
  aaa: number;
  bbb: string;
}

// 使用ConfigurableModuleBuilder构建可配置的模块， 这个模块就自带了register、registerAsync方法
// MODULE_OPTIONS_TOKEN用于注入模块配置
export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<CccModuleOptions>()
  // .setClassMethodName('forRoot') // 设置动态模块注册options的静态方法名
  .setExtras(
    {
      isGlobal: true, // 设置模块为全局模块, 这样ccc模块export的provider就可以在其他模块中使用
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  ) // 给options扩展额外的属性
  .build();
