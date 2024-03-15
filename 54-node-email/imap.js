const { MailParser } = require('mailparser')
const fs = require('fs')
const path = require('path')
const Imap = require('imap')

const imap = new Imap({
  user: '1824056030@qq.com',
  password: '',
  host: 'imap.qq.com',
  port: 993,
  tls: true
})

// 修复文件名的/字符问题
const fixFilename = (filename) => filename.replace(/\//g, '-')
console.log(fixFilename('Re: [zhangfisher/voerka-i18n] VoerkaI18n 3.0新特性征集 (Issue #21).html'))

function handleResults(results) {
  imap
    .fetch(results, {
      bodies: ''
    })
    .on('message', (msg) => {
      const mailparser = new MailParser()

      msg.on('body', (stream) => {
        const info = {}
        stream.pipe(mailparser)

        mailparser.on('headers', (headers) => {
          info.theme = headers.get('subject')
          info.form = headers.get('from').value[0].address
          info.mailName = headers.get('from').value[0].name
          info.to = headers.get('to').value[0].address
          info.datatime = headers.get('date').toLocaleString()
        })

        mailparser.on('data', (data) => {
          if (data.type === 'text') {
            info.html = data.html
            info.text = data.text
            const filePath = path.join(__dirname, 'mails', fixFilename(info.theme) + '.html')
            fs.writeFileSync(filePath, info.html || info.text)
          }
          if (data.type === 'attachment') {
            const filePath = path.join(__dirname, 'files', fixFilename(data.filename))
            const ws = fs.createWriteStream(filePath)
            data.content.pipe(ws)
          }
        })
      })
    })
}

imap.once('ready', () => {
  imap.openBox('INBOX', true, (err) => {
    imap.search([['SEEN'], ['SINCE', new Date('2024-02-14 12:00:00').toLocaleString()]], (err, results) => {
      if (!err) {
        console.log(results)
        handleResults(results)
      } else {
        throw err
      }
    })
  })
})

imap.connect()
