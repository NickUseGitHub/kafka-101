const kafka = require("kafka-node");

const client = new kafka.KafkaClient({
  kafkaHost: "localhost:9092",
});

const Producer = kafka.Producer;
const producer = new Producer(client);
const sentMessage = JSON.stringify("What the heck");

producer.on("ready", function () {
  console.log("Producer is ready");

  send(sentMessage);
});

function send(sentMessage) {
  payloads = [{ topic: "kafka-node-dev", messages: sentMessage, partition: 0 }];
  producer.send(payloads, function (err, data) {
    console.log("send data ", sentMessage);
  });
}

[...new Array(3)].forEach((_, index) => send(`message: ${index}`));
