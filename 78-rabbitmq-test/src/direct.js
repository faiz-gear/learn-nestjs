import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

// direct 交换机: 把消息放到交互及的指定key的队列中
await channel.assertExchange('direct-test-exchange', 'direct');

// 第二个参数是routingKey, 代表消息路由到哪个队列
channel.publish('direct-test-exchange', 'aaa',  Buffer.from('hello1'));
channel.publish('direct-test-exchange', 'bbb',  Buffer.from('hello2'));
channel.publish('direct-test-exchange', 'ccc',  Buffer.from('hello3'));
