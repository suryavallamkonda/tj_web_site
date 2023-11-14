exports.hello_world = (req, res) => {
  res.send("goodbye");
};

exports.template = (req, res) => {
  res.send("this is template");
  res.render("test");
};
