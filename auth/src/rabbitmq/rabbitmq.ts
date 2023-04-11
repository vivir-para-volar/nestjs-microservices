import * as amqp from "amqplib";
import { RoutingKeys } from "./../rabbitmq/routingKeys";

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

  async consumeMessages(context) {
    if (!this.channel) {
      await this.createChannel();
    }

    const exchangeName = this.exchangeName;
    await this.channel.assertExchange(exchangeName, "topic");

    const q = await this.channel.assertQueue("authQueue");
    await this.channel.bindQueue(q.queue, this.exchangeName, "from-profiles.#");

    this.channel.consume(q.queue, (msg) => {
      const data = JSON.parse(msg.content);

      if (data.logType === RoutingKeys.registrationFromProfiles) {
        console.log("Registration start");
        context.registration(JSON.parse(data.message));
        this.channel.ack(msg);
      } 
      if (data.logType === RoutingKeys.deleteUserFromProfiles) {
        context.deleteUserById(JSON.parse(data.message).id);
        this.channel.ack(msg);
      }
    });
  }
}

const rabbitMQ = new RabbitMQ();
rabbitMQ.createChannel();

export default rabbitMQ;
