require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env'
})

console.log(process.env)
