// const mysql = require('mysql2')
const mysql = require('mysql2/promise')
// promise版本

/* ---------------------------------- 基本使用 ---------------------------------- */
// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: 'LUyao514',
//   database: 'practice'
// })

// connection.query('SELECT * FROM customers', function (err, results, fields) {
//   console.log(results)
//   console.log(fields.map((item) => item.name))
// })

// 指定占位符
// connection.query('SELECT * FROM customers WHERE name like ?', ['李%'], function (err, results, fields) {
//   console.log(results)
//   console.log(fields.map((item) => item.name))
// })

// 插入数据
// connection.query('INSERT INTO customers (name) VALUES (?)', ['李四'], function (err, results, fields) {
//   console.log(err)
// })

// 更新数据
// connection.query('UPDATE customers SET name = ? WHERE id = ?', ['Lyle', 21], function (err, results, fields) {
//   console.log(err)
// })

// 删除数据
// connection.query('DELETE FROM customers WHERE id = ?', [21], function (err, results, fields) {
//   console.log(err)
// })

// connection.query('SELECT * FROM customers', function (err, results, fields) {
//   console.log(results)
//   console.log(fields.map((item) => item.name))
// })

/* ---------------------------------- 基本使用 ---------------------------------- */

/* ---------------------------------- 使用连接池 --------------------------------- */
;(async function () {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'LUyao514',
    database: 'practice',
    waitForConnections: true, // 如果连接数达到上限，是否等待。false时，直接报错
    connectionLimit: 10, // 最大连接数
    maxIdle: 10, // 最大空闲连接数
    idleTimeout: 60000, // 空闲连接多久会断开
    queueLimit: 0, // 等待连接的最大数量，0为不限制
    enableKeepAlive: true, // 是否保持连接 用于心跳检测, 默认值就好
    keepAliveInitialDelay: 0 // 保持连接的时间间隔 用于心跳检测 默认值就好
  })

  const [results] = await pool.query('select * from customers')
  console.log(results)
})()
/* ---------------------------------- 使用连接池 --------------------------------- */
