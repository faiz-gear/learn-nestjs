const OSS = require('ali-oss')

// const client = new OSS({
//   region: 'oss-cn-shenzhen',
//   bucket: 'faiz-gear-test',
//   accessKeyId: 'LTAI5tKPbTLfFoz3z5fpMo4C',
//   accessKeySecret: 'be7T79fDCRGhEyw6ai74xtkc46WmFA'
// })

// async function put() {
//   try {
//     const result = await client.put('5.png', './5.png')
//     console.log(result)
//   } catch (e) {
//     console.log(e)
//   }
// }

// put()

async function main() {
  const config = {
    region: 'oss-cn-shenzhen',
    bucket: 'faiz-gear-test',
    accessKeyId: 'LTAI5tKPbTLfFoz3z5fpMo4C',
    accessKeySecret: 'be7T79fDCRGhEyw6ai74xtkc46WmFA'
  }

  const client = new OSS(config)

  const date = new Date()

  date.setDate(date.getDate() + 1)

  const res = client.calculatePostSignature({
    expiration: date.toISOString(), // 设置Policy的失效时间，超过这个失效时间之后，上传请求将被拒绝。
    conditions: [
      ['content-length-range', 0, 1048576000] //设置上传文件的大小限制。
    ]
  })

  console.log(res)

  const location = await client.getBucketLocation()

  const host = `http://${config.bucket}.${location.location}.aliyuncs.com`

  console.log(host)
}

main()
