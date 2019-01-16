const pg = require("pg");
const connectionString =
  process.env.DATABASE_URL || "postgres://postgres@db:5432/todo";

const client = new pg.Client(connectionString);
client.connect();
console.log("connected to client");
const query = client.query(
  "CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)"
);
query.on("end", () => {
  client.end();
});
