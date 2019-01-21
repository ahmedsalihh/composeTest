exports.get_hello = function(req, res) {
  res.send({ result: "hello example 1" });
  res.end();
};

exports.post_hello = function(req, res) {
  const data = req.body;
  const result = { text: "post succesfull", data };
  res.send(result);
  res.end();
};
