var amqp = require("amqplib/callback_api");

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
  process.exit(1);
}

amqp.connect(
  "amqp://mq",
  function(err, conn) {
    conn.createChannel(function(err, ch) {
      var ex = "direct_logs";

      ch.assertExchange(ex, "direct", { durable: true });

      ch.assertQueue("", { exclusive: true }, function(err, q) {
        console.log(" [*] Waiting for logs. To exit press CTRL+C");

        args.forEach(function(topic) {
          ch.bindQueue(q.queue, ex, topic);
        });

        ch.consume(
          q.queue,
          function(msg) {
            console.log(
              " [x] received %s: '%s'",
              msg.fields.routingKey,
              msg.content.toString()
            );
          },
          { noAck: true }
        );
      });
    });
  }
);
