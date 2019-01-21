module.exports = function(app) {
  var rabbit = require("../controllers/rabbitController");

  app
    .route("/api/rabbit")
    .get(rabbit.get_rabbit)
    .post(rabbit.create_rabbit);
};
