import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertQueue('aaa', {
  // durable: false // 如果设置为true，当RabbitMQ服务器重启时，队列将会被保留
});
// await channel.sendToQueue('aaa',Buffer.from('hello'))

let i = 1;
// 500ms 发送一次消息
setInterval(async () => {
    const msg = 'hello' + i;
    console.log('发送消息：', msg);
    await channel.sendToQueue('aaa',Buffer.from(msg))
    i++;
}, 500);

// await channel.deleteQueue('aaa')