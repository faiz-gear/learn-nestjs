const Minio = require('minio')
const fs = require('fs')

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: '',
  secretKey: ''
})

// function put() {
//   minioClient.fPutObject('test', 'home.png', './home.png', function (err, etag) {
//     if (err) return console.log(err)
//     console.log('File uploaded successfully.')
//   })
// }

// put()

function get() {
  minioClient.getObject('test', 'home.png', (err, stream) => {
    if (err) return console.log(err)
    stream.pipe(fs.createWriteStream('./home-download.png'))
  })
}

get()
