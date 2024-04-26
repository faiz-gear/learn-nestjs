import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

const { queue } = await channel.assertQueue('queue1');
// 第二个参数source, 代表属于哪个交换机; 第三个参数pattern, 与交换机的routingKey相同
await channel.bindQueue(queue,  'direct-test-exchange', 'aaa');

channel.consume(queue, msg => {
    console.log(msg.content.toString())
}, { noAck: true });
