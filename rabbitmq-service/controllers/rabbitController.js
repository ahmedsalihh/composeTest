const amqp = require("amqplib/callback_api");

exports.get_rabbit = function(req, res) {
  res.send("you've got rabitted");
  res.end();
};

exports.create_rabbit = function(req, res) {
  const data = req.body;
  emitMessage(JSON.stringify(data), "save_to_db");
  res.send(data);
  res.end();
};

function emitMessage(msg, topic) {
  amqp.connect(
    "amqp://mq",
    function(err, conn) {
      conn.createChannel(function(err, ch) {
        const ex = "direct_logs";

        ch.assertExchange(ex, "direct", { durable: true });
        ch.publish(ex, topic, new Buffer.from(msg));
        console.log(" [x] Sent %s: '%s'", topic, msg);
      });

      setTimeout(function() {
        conn.close();
        // process.exit(0);
      }, 500);
    }
  );
}
