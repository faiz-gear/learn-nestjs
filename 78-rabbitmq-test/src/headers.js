import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertExchange('headers-test-exchange', 'headers');

// headers 交换机: 通过header中的键值对匹配消息路由到队列
channel.publish('headers-test-exchange', '',  Buffer.from('hello1'), {
    headers: {
        name: 'faiz'
    }
});
channel.publish('headers-test-exchange', '',  Buffer.from('hello2'), {
    headers: {
        name: 'faiz'
    }
});
channel.publish('headers-test-exchange', '',  Buffer.from('hello3'), {
    headers: {
        name: 'gear'
    }
});
