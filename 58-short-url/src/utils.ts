import * as base62 from 'base62/lib/ascii';

// base62: Base62是一种数值表示方法，它使用62个字符来表示数字。这62个字符通常是10个数字（0-9），26个小写字母（a-z），和26个大写字母（A-Z）。
// 这种编码方式常常用于URL短链接服务，因为它可以将长的数字ID压缩为较短的字符串。
// base64比base62多两个特殊字符

/**
 * @description: 生成位数随机字符串
 * @param {number} len
 * @return {*}
 */
export function generateRandomStr(len: number) {
  let str = '';
  for (let i = 0; i < len; i++) {
    const num = Math.floor(Math.random() * 62);
    str += base62.encode(num);
  }

  return str;
}
