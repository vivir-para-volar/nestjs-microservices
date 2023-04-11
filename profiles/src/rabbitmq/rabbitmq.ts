import * as amqp from "amqplib";
import { RoutingKeys } from "./routingKeys";

class RabbitMQ {
  private url = "amqp://localhost";
  private exchangeName = "logExchange";

  private channel;

  async createChannel() {
    const connection = await amqp.connect(this.url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.createChannel();
    }

    const exchangeName = this.exchangeName;
    await this.channel.assertExchange(exchangeName, "topic");

    const logDetails = {
      logType: routingKey,
      message: message,
      dateTime: new Date(),
    };
    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(logDetails))
    );

    console.log(
      `The new ${routingKey} log is sent to exchange ${exchangeName}`
    );
  }

  async consumeMessagesRegistration(context) {
    if (!this.channel) {
      await this.createChannel();
    }

    const exchangeName = this.exchangeName;
    await this.channel.assertExchange(exchangeName, "topic");

    const q = await this.channel.assertQueue("profilesQueue");
    await this.channel.bindQueue(q.queue, this.exchangeName, "from-auth.#");

    this.channel.consume(q.queue, (msg) => {
      const data = JSON.parse(msg.content);
      console.log(data);

      if (data.logType === RoutingKeys.registrationFromAuth) {
        context.registeredUserId = JSON.parse(data.message).id;
        this.channel.ack(msg);
      }
    });
  }
}

const rabbitMQ = new RabbitMQ();
rabbitMQ.createChannel();

export default rabbitMQ;