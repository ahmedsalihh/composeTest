const pg = require("pg");
const connectionString =
  process.env.DATABASE_URL || "postgres://postgres@db:5432/todo";

const amqp = require("amqplib/callback_api");

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_direct.js [save_to_db]");
  process.exit(1);
}

amqp.connect(
  "amqp://mq",
  function(err, conn) {
    conn.createChannel(function(err, ch) {
      const ex = "direct_logs";

      ch.assertExchange(ex, "direct", { durable: true });

      ch.assertQueue("", { exclusive: true }, function(err, q) {
        console.log(" [*] Waiting for logs. To exit press CTRL+C");

        args.forEach(function(topic) {
          ch.bindQueue(q.queue, ex, topic);
        });

        ch.consume(
          q.queue,
          function(msg) {
            const data = JSON.parse(msg.content.toString());

            saveToDb(data);
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

function saveToDb(data) {
  const results = [];

  pg.connect(
    connectionString,
    (err, client, done) => {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }
      // SQL Query > Insert Data
      client.query("INSERT INTO items(text, complete) values($1, $2)", [
        data.text,
        data.complete
      ]);
      // SQL Query > Select Data
      const query = client.query("SELECT * FROM items ORDER BY id ASC");
      // Stream results back one row at a time
      query.on("row", row => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on("end", () => {
        done();
      });
    }
  );
}
