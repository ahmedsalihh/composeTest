module.exports = function(app) {
  var example1 = require("../controllers/example1Controller");

  app
    .route("/api/example1")
    .get(example1.get_hello)
    .post(example1.post_hello);
};
