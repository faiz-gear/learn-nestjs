import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

// assertQueue() is used to create a queue if it doesn't exist
const { queue } = await channel.assertQueue('aaa');
channel.prefetch(3) // prefetch是指在同一时间内，最多只能有3个消息被消费者消费.消费之一开始取3条消息,之后每处理完一条消息就会再取一条消息,保证并发量为3

const currentTask = []
// consume() is used to consume messages from a queue
channel.consume(queue, msg => {
    currentTask.push(msg)
    console.log(msg.content.toString())
}, { noAck: false }); // noAck: false表示需要手动确认消息 

setInterval(() => {
  const msg = currentTask.pop()
  channel.ack(msg) // 手动确认消息, 消息确认后，RabbitMQ会删除该消息
}, 1000)
