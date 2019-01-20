var amqp = require("amqplib/callback_api");

exports.get_rabbit = function(req, res) {
  res.send("you've got rabitted");
  res.end();
};

exports.create_rabbit = function(req, res) {
  var data = req.body.data;
  emitMessage(data,"test");
  sentToQueue(data);
  res.send(data);
  res.send();
};

function emitMessage(msg,topic) {
  amqp.connect(
    "amqp://mq",
    function(err, conn) {
      conn.createChannel(function(err, ch) {
        var ex = "direct_logs";

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

function sentToQueue(msg) {
  amqp.connect(
    "amqp://mq",
    function(err, conn) {
      conn.createChannel(function(err, ch) {
        var q = "hello";
        // var msg = "Hello World!";

        ch.assertQueue(q, { durable: true });
        ch.sendToQueue(q, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
      });
      setTimeout(function() {
        conn.close();
      }, 500);
    }
  );
}
