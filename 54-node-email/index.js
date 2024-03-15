const nodemailer = require('nodemailer')
const fs = require('fs')

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 587,
  secure: false,
  auth: {
    user: '1824056030@qq.com',
    pass: ''
  }
})

async function main() {
  const info = await transporter.sendMail({
    from: '"luyao" <1824056030@qq.com>',
    to: 'luyao1999514@163.com',
    subject: 'Hello 111',
    text: 'xxxxx',
    html: fs.readFileSync('./template.html', 'utf-8')
  })

  console.log('邮件发送成功：', info.messageId)
}

main().catch(console.error)
