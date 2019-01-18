var amqp = require("amqplib/callback_api");

exports.get_rabbit = function(req, res) {
  res.send("you've got rabitted");
  res.end();
};

exports.create_rabbit = function(req, res) {
  var data = req.body.data;
  emitMessage(data);
  sentToQueue(data);
  res.send(data);
  res.send();
};

function emitMessage(msg) {
  amqp.connect(
    "amqp://localhost",
    function(err, conn) {
      conn.createChannel(function(err, ch) {
        var ex = "direct_logs";
        var args = process.argv.slice(2);
        // var msg = args.slice(1).join(" ") || "Hello World!";
        var severity = args.length > 0 ? args[0] : "info";

        ch.assertExchange(ex, "direct", { durable: true });
        ch.publish(ex, severity, new Buffer.from(msg));
        console.log(" [x] Sent %s: '%s'", severity, msg);
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
    "amqp://localhost",
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
