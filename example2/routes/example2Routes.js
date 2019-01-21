module.exports = function(app) {
  var example2 = require("../controllers/example2Controller");

  app
    .route("/api/example2")
    .get(example2.get_rabbit)
    .post(example2.create_rabbit);
};
