import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertExchange('fanout-test-exchange', 'fanout');

const { queue } = await channel.assertQueue('queue1');
// await channel.bindQueue(queue,  'fanout-test-exchange', 'aaa');
// 这里的第三个参数pattern, 与交换机的routingKey相同, 但是这里不需要指定
await channel.bindQueue(queue,  'fanout-test-exchange', '');

channel.consume(queue, msg => {
    console.log(msg.content.toString())
}, { noAck: true });
