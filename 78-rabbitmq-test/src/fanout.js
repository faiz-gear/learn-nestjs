import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertExchange('fanout-test-exchange', 'fanout');

// fanout 交换机: 把消息放到交换机的所有队列中 不需要指定routingKey
channel.publish('fanout-test-exchange', '',  Buffer.from('hello1'));
channel.publish('fanout-test-exchange', '',  Buffer.from('hello2'));
channel.publish('fanout-test-exchange', '',  Buffer.from('hello3'));
